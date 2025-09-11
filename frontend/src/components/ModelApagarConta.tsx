// components/ModalApagarConta.tsx
import { useState } from "react";

interface ModalApagarContaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (senha: string) => void;
}

export default function ModalApagarConta({
  isOpen,
  onClose,
  onConfirm,
}: ModalApagarContaProps) {
  const [senha, setSenha] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!senha.trim()) {
      alert("Por favor, digite sua senha.");
      return;
    }
    onConfirm(senha);
    setSenha(""); // limpa após confirmar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4 text-red-600">⚠️ Apagar Conta</h2>
        <p className="text-gray-700 mb-4">
          Tem certeza que deseja excluir sua conta? Essa ação não pode ser
          desfeita.
        </p>

        <input
          type="password"
          placeholder="Digite sua senha para confirmar"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
