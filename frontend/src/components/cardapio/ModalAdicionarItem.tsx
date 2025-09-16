import { useState } from "react";

type ModalAdicionarItemProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: {
    tipo: string;
    nome: string;
    descricao: string;
    valor: string;
  }) => void;
};

export default function ModalAdicionarItem({ isOpen, onClose, onSave }: ModalAdicionarItemProps) {
  const [tipo, setTipo] = useState("entrada");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  if (!isOpen) return null;

  const handleSalvar = () => {
    onSave({ tipo, nome, descricao, valor });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Adicionar Item</h2>

        {/* Select Tipo do prato */}
        <label className="block mb-2 font-medium">Tipo do prato</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        >
          <option value="entrada">Entrada</option>
          <option value="principais">Prato Principal</option>
          <option value="sobremesas">Sobremesa</option>
          <option value="bebidas">Bebida</option>
        </select>

        {/* Nome do prato */}
        <label className="block mb-2 font-medium">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Descrição */}
        <label className="block mb-2 font-medium">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Valor */}
        <label className="block mb-2 font-medium">Valor</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
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
