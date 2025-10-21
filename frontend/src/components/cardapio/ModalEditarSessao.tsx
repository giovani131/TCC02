
import React, { useState, useEffect } from "react";

type ModalEditarSessaoProps = {
  isOpen: boolean;
  onClose: () => void;
  sessaoEmEdicao: { id: number; nome_sessao: string; ordem: number; } | null
  onSave: (dados: {
    nome_sessao: string;
    ordem: number;
  }) => void;
};

export default function ModalEditarSessao({ isOpen, onClose, onSave, sessaoEmEdicao }: ModalEditarSessaoProps) {


    const [nome_sessao, setNomeSessao] = useState("");
    const [ordem, setOrdem] = useState<number | "">(0);


    useEffect(() => {
        if (sessaoEmEdicao) {
        setNomeSessao(sessaoEmEdicao.nome_sessao);
        setOrdem(sessaoEmEdicao.ordem);

        }
    }, [isOpen]); 

    if (!isOpen) return null;

    const handleSalvar = () => {

        onSave({ nome_sessao, ordem: Number(ordem)});
        onClose();
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Sessão</h2>

        <form onSubmit={handleSalvar} className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Nome da Sessão:</p>
            <input
              type="text"
              value={nome_sessao}
              onChange={(e) => setNomeSessao(e.target.value)}
              placeholder="Nome da sessão"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Ordem:</p>
            <input
              type="number"
              value={ordem}
              onChange={(e) => setOrdem(Number(e.target.value))}
              placeholder="Ordem da sessão"
              min={1}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}
