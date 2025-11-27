import React, { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  estabelecimento: {
    nome_restaurante: string;
    nome_responsavel: string;
    cpf_responsavel: string;
    cnpj: string;
    telefone_responsavel: string;
    email_responsavel: string;
  } | null;
  onSave: (formData: {
    nome_restaurante: string;
    nome_responsavel: string;
    cpf_responsavel: string;
    cnpj: string;
    telefone_responsavel: string;
    email_responsavel: string;
  }) => void;
};

export default function ModalEditarEstabelecimento({
  isOpen,
  onClose,
  estabelecimento,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    nome_restaurante: "",
    nome_responsavel: "",
    cpf_responsavel: "",
    cnpj: "",
    telefone_responsavel: "",
    email_responsavel: ""
  });

  // Sempre que abrir o modal, preencher com os dados atuais
  useEffect(() => {
    if (estabelecimento) {
      setFormData({
        nome_restaurante: estabelecimento.nome_restaurante,
        nome_responsavel: estabelecimento.nome_responsavel,
        cpf_responsavel: estabelecimento.cpf_responsavel,
        cnpj: estabelecimento.cnpj,
        telefone_responsavel: estabelecimento.telefone_responsavel,
        email_responsavel: estabelecimento.email_responsavel
      });
    }
  }, [estabelecimento, isOpen]);

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
        <h2 className="text-xl font-bold mb-4">Editar Estabelecimento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p>Nome do Restaurante:</p>
            <input
              type="text"
              name="nome_restaurante"
              value={formData.nome_restaurante}
              onChange={handleChange}
              placeholder="Nome do Restaurante"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Nome do Responsável:</p>
            <input
              type="text"
              name="nome_responsavel"
              value={formData.nome_responsavel}
              onChange={handleChange}
              placeholder="Nome do Responsável"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>CPF do Responsável:</p>
            <input
              type="text"
              name="cpf_responsavel"
              value={formData.cpf_responsavel}
              onChange={handleChange}
              placeholder="CPF"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>CNPJ do Estabelecimento:</p>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="CNPJ"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Telefone do Responsável:</p>
            <input
              type="text"
              name="telefone_responsavel"
              value={formData.telefone_responsavel}
              onChange={handleChange}
              placeholder="Telefone"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p>Email do Responsável:</p>
            <input
              type="email"
              name="email_responsavel"
              value={formData.email_responsavel}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded
                        transition transform duration-200 ease-out
                        hover:bg-gray-100 hover:scale-105 hover:shadow-sm
                        active:scale-95"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded
                        transition transform duration-200 ease-out
                        hover:bg-purple-600 hover:scale-105 hover:shadow-md
                        active:scale-95"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
