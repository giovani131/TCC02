import React, { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dados: {
    telefone_restaurante: string;
    especialidade: string;
    descricao_restaurante: string;
    meios_pagamento: string[];
    tipos_servico: string[];
  } | null;
  onSave: (formData: {
    telefone_restaurante: string;
    especialidade: string;
    descricao_restaurante: string;
    meios_pagamento: string[];
    tipos_servico: string[];
  }) => void;
};

export default function ModalEditarEstabelecimentoInfosAdicionais({
  isOpen,
  onClose,
  dados,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    telefone_restaurante: "",
    especialidade: "",
    descricao_restaurante: "",
    meios_pagamento: [] as string[],
    tipos_servico: [] as string[],
  });

  useEffect(() => {
    if (dados) {
      setFormData(dados);
    }
  }, [dados, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleListChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value.split(",").map((v) => v.trim()),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-[420px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Informações Adicionais</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <p>Telefone do Restaurante:</p>
            <input
              type="text"
              name="telefone_restaurante"
              value={formData.telefone_restaurante}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Especialidade:</p>
            <input
              type="text"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Descrição:</p>
            <textarea
              name="descricao_restaurante"
              value={formData.descricao_restaurante}
              onChange={handleChange}
              className="w-full p-2 border rounded h-24"
            ></textarea>
          </div>

          <div>
            <p>Meios de Pagamento (separe por vírgula):</p>
            <input
              type="text"
              value={formData.meios_pagamento.join(", ")}
              onChange={(e) => handleListChange("meios_pagamento", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Tipos de Serviço (separe por vírgula):</p>
            <input
              type="text"
              value={formData.tipos_servico.join(", ")}
              onChange={(e) => handleListChange("tipos_servico", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 hover:scale-105 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 hover:scale-105 transition"
            >
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
