import { useState } from "react";
import DialogAddGameByImage from "../../../components/dialog/DialogAddGameByImage";

export default function Camtest() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Minha Conta</h1>
      <button
        style={{
          padding: "10px 20px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => setShowAddModal(true)}
      >
        + Adicionar jogo por imagem
      </button>
      <DialogAddGameByImage
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
