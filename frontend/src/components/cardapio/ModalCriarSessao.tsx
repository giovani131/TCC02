import { useState } from "react";

type ModalAdicionarSessaoProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: {
    nome_sessao: string;
    ordem: number;
  }) => void;
};

export default function ModalAdicionarSessao({ isOpen, onClose, onSave }: ModalAdicionarSessaoProps) {
  const [nome_sessao, setNome] = useState("");
  const [ordem, setOrdem] = useState<number | "">("");

  if (!isOpen) return null;

  const handleSalvar = () => {
    if (nome_sessao.trim() === "" || ordem === "") return; // simples validação
    onSave({ nome_sessao, ordem: Number(ordem) });
    setNome("")
    setOrdem(1)
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Adicionar Sessão</h2>

        {/* Nome da Sessão */}
        <label className="block mb-2 font-medium">Nome da Sessão</label>
        <input
          type="text"
          value={nome_sessao}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Ordem */}
        <label className="block mb-2 font-medium">Ordem</label>
        <input
          type="number"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSalvar}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
