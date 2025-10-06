import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface GameData {
  id: string;
  igdbId: number;
  name: string;
}

export default function DialogAddGameByImage({ open, onClose }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mockGame: GameData = {
    id: "1",
    igdbId: 101,
    name: "The Legend of Zelda",
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      // Para qualquer stream anterior imediatamente
      stopCamera();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`relative flex flex-col items-center bg-gray-800 rounded-xl p-5 w-[600px] ${
          step === 1 ? "h-[640px]" : "h-[500px]"
        }`}
      >
        <h2 className="text-white text-2xl font-bold mb-5">Adicionar jogo por imagem</h2>

        <button
          className="absolute top-3 right-3 text-white text-2xl cursor-pointer bg-transparent"
          onClick={() => {
            onClose();
            stopCamera();
          }}
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <div className="flex gap-2 w-full mb-3">
              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
                onClick={handleCameraClick}
                type="button"
              >
                Câmera
              </button>

              <label
                htmlFor="fileUpload"
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-center cursor-pointer"
                onClick={handleFileClick}
              >
                Arquivo
              </label>
              <input id="fileUpload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="relative flex-1 w-full bg-gray-900 rounded-lg mb-3 flex justify-center items-center overflow-hidden">
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

            {cameraActive && (
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer mb-2" onClick={takePhoto} type="button">
                Tirar Foto
              </button>
            )}

            <div className="flex justify-center w-full mt-2">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50"
                onClick={() => setStep(2)}
                disabled={!previewUrl}
                type="button"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-1 gap-5">
              <div className="flex-1 flex justify-center items-center">
                {previewUrl && <img src={previewUrl} alt="Imagem do usuário" className="w-4/5 rounded-lg" />}
              </div>

              <div className="flex-1 flex flex-col items-start pt-2 text-white text-lg">
                <span className="font-bold text-xl">{mockGame.name}</span>
                <span className="text-sm text-gray-400">{mockGame.id}</span>
                <span className="text-sm text-gray-400">{mockGame.igdbId}</span>
              </div>
            </div>

            <div className="flex justify-between w-full mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => setStep(1)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => {
                  console.log("Finalizar com imagem:", selectedFile);
                  onClose();
                }}
                type="button"
              >
                Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
