import React, { useState } from "react";

type CardapioData = {
  nome_cardapio: string;
  descricao_cardapio: string;
  status: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: CardapioData) => void;
};

export default function ModalCriarCardapio({ isOpen, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<CardapioData>({
    nome_cardapio: "",
    descricao_cardapio: "",
    status: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "status" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ nome_cardapio: "", descricao_cardapio: "", status: 1 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Criar Cardápio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p>Nome do Cardápio:</p>
            <input
              type="text"
              name="nome_cardapio"
              value={formData.nome_cardapio}
              onChange={handleChange}
              placeholder="Nome do cardápio"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>Descrição do Cardápio:</p>
            <textarea
              name="descricao_cardapio"
              value={formData.descricao_cardapio}
              onChange={handleChange}
              placeholder="Descrição do cardápio"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>Status:</p>
            <input
              type="number"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="1-Ativo, 2-Inativo, 3-Bloqueado"
              min={1}
              max={3}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

