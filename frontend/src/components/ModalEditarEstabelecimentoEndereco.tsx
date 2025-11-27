import React, { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  endereco: {
    endereco_cep: string;
    endereco_estado: string;
    endereco_cidade: string;
    endereco_bairro: string;
    endereco_rua: string;
    endereco_num: string;
  } | null;
  onSave: (formData: {
    endereco_cep: string;
    endereco_estado: string;
    endereco_cidade: string;
    endereco_bairro: string;
    endereco_rua: string;
    endereco_num: string;
  }) => void;
};

export default function ModalEditarEstabelecimentoEndereco({
  isOpen,
  onClose,
  endereco,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    endereco_cep: "",
    endereco_estado: "",
    endereco_cidade: "",
    endereco_bairro: "",
    endereco_rua: "",
    endereco_num: "",
  });

  useEffect(() => {
    if (endereco) {
      setFormData(endereco);
    }
  }, [endereco, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Endereço</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <p>CEP:</p>
            <input
              type="text"
              name="endereco_cep"
              value={formData.endereco_cep}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Estado:</p>
            <input
              type="text"
              name="endereco_estado"
              value={formData.endereco_estado}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Cidade:</p>
            <input
              type="text"
              name="endereco_cidade"
              value={formData.endereco_cidade}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Bairro:</p>
            <input
              type="text"
              name="endereco_bairro"
              value={formData.endereco_bairro}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Rua:</p>
            <input
              type="text"
              name="endereco_rua"
              value={formData.endereco_rua}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Número:</p>
            <input
              type="text"
              name="endereco_num"
              value={formData.endereco_num}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 hover:scale-105 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded
                         hover:bg-purple-600 hover:scale-105 transition"
            >
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
