import React, { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  usuario: { nome: string; email: string; telefone: string } | null;
  onSave: (formData: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }) => void;
};

export default function ModalEditarUsuario({
  isOpen,
  onClose,
  usuario,
  onSave,
}: Props) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  // Sempre que abrir o modal, preencher com os dados do usuário atual
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        senha: "",
      });
    }
  }, [usuario, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null; // não renderiza se estiver fechado

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Dados</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>Nome:</p>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="w-full p-2 border rounded"
          />
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <p>Telefone:</p>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            className="w-full p-2 border rounded"
          />
          <p>Senha:</p>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Nova Senha"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
