import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { instance } from "../../lib/axios";
import { useNavigate } from "react-router";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface GameData {
  id: string
  name: string
  cover_url: string
  alternatives: {
    id: string
    name: string
  }[]
}

export default function DialogAddGameByImage({ open, onClose }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundGame, setFoundGame] = useState<GameData | null>(null);
  const navigate = useNavigate()

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: { facingMode: "environment" },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (err) {
          console.warn("Não foi possível dar play no vídeo automaticamente:", err);
        }
      }
    } catch (err) {
      console.error("Erro ao acessar câmera", err);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (open) {
      startCamera();
      setCameraActive(true);
    } else {
      stopCamera();
    }
  }, [open]);

  const stopCamera = () => {
    try {
      const videoEl = videoRef.current;
      if (videoEl && videoEl.srcObject) {
        const tracks = (videoEl.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
        videoEl.srcObject = null;
      }
    } catch (err) {
      console.warn("Erro ao parar câmera:", err);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.png", { type: "image/png" });
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(blob));
            setCameraActive(false);
            stopCamera();
          }
        },
        "image/png",
        1
      );
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) return;

    try {
      setIsSearching(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      // TODO: ajuste a rota abaixo para a rota correta do seu backend
      const response = await instance.post("/cover-matcher/search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Adapte este parse ao formato real que o backend retorna
      const match = response.data.match;
      console.log(response.data);

      const game: GameData = {
        id: match.id?.toString() ?? "0",
        cover_url: match.cover_url,
        name: match.name ?? "Unknown game",
        alternatives: response.data.alternatives
      };

      setFoundGame(game);
      setStep(2);
    } catch (err) {
      console.error("Erro ao buscar jogo pela imagem:", err);
      setError("Não foi possível identificar o jogo. Tente outra imagem.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setSelectedFile(f);

    stopCamera();
    setCameraActive(false);

    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(f);

    } else {
      setPreviewUrl(null);
    }
  };

  const handleCameraClick = () => {
    if (previewUrl) {
      try {
        if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      } catch {}
    }
    setPreviewUrl(null);
    setSelectedFile(null);

    stopCamera();
    setCameraActive(true);
  };

  const handleFileClick = () => {
    stopCamera();
    setCameraActive(false);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`relative flex flex-col items-center bg-[#141414] border border-[#343434] rounded-xl p-5 w-[600px] ${
          step === 1 ? "h-[640px]" : ""
        }`}
      >
        <div className="flex flex-row items-center justify-between w-full mb-8">
          <h2 className="text-white text-xl font-bold">Add game with photo</h2>

          <button
            className="text-white text-2xl cursor-pointer bg-transparent"
            onClick={() => {
              onClose();
              stopCamera();
            }}
          >
            ✕
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="flex gap-2 w-full mb-3">
              <button
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg cursor-pointer"
                onClick={handleCameraClick}
                type="button"
              >
                Camera
              </button>

              <label
                htmlFor="fileUpload"
                className="flex-1 bg-white/10 text-white py-2 rounded-lg text-center cursor-pointer"
                onClick={handleFileClick}
              >
                File
              </label>
              <input id="fileUpload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="relative flex-1 w-full bg-black rounded-lg mb-3 flex justify-center items-center overflow-hidden">
              {cameraActive ? (
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              ) : previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-[90%] max-h-[90%] object-contain" />
              ) : (
                <span className="text-gray-400">Nenhuma imagem selecionada</span>
              )}

              <div className="absolute border-2 border-dashed border-white w-[230px] h-[330px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {error && (
              <span className="w-full text-sm text-red-400 mb-2 text-center">
                {error}
              </span>
            )}

            <div className="flex flex-row items-center justify-center gap-4">
              <Button variant="purple" className="w-full" disabled={!cameraActive} onClick={takePhoto}>Take photo</Button>
              <Button
                className="w-full"
                disabled={!previewUrl || !selectedFile || isSearching}
                onClick={handleSearch}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col w-full">
            <div onClick={() => navigate(`/game/${foundGame?.id}`)} className="flex-1 flex flex-row items-center cursor-pointer hover:bg-[#202020] hover:border-[#444444] bg-[#191919] border border-[#343434] p-2 gap-4 rounded-xl">
              <img src={foundGame?.cover_url} alt="Imagem do usuário" className="w-30 h-40 rounded-lg" />
              <span className="font-bold text-lg">{foundGame?.name}</span>
            </div>

            <div className="mt-6">
              <h1 className="font-bold mb-2">Other options</h1>
              <div className="flex flex-col gap-2">
                {
                  foundGame?.alternatives.map((item) => {
                    return (
                      <div onClick={() => navigate(`/game/${item.id}`)} key={item.id} className="flex-1 flex flex-row items-center cursor-pointer hover:bg-[#202020] hover:border-[#444444] bg-[#191919] border border-[#343434] p-2 gap-4 rounded-xl">
                        <span className="font-bold text-md">{item.name}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="flex mt-4">
              <Button
                variant="purple"
                className="w-full"
                onClick={() => {
                  setStep(1)
                  startCamera()
                  setCameraActive(true)
                }}
              >Return</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
