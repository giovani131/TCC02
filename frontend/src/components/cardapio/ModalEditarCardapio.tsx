import React, { useState, useEffect } from "react";

type ModalEditarCardapioProps = {
  isOpen: boolean;
  onClose: () => void;
  cardapioEmEdicao: { id: number; nome_cardapio: string; descricao_cardapio: string; status: number; } | null
  onSave: (dados: {
    nome_cardapio: string;
    descricao_cardapio: string;
    status: number;
  }) => void;
};

export default function ModalEditarCardapio({ isOpen, onClose, onSave, cardapioEmEdicao }: ModalEditarCardapioProps) {


    const [nome_cardapio, setNomeCardapio] = useState("");
    const [descricao_cardapio, setDescricaoCardapio] = useState("");
    const [status, setStatus] = useState<number | "">(0);


    useEffect(() => {
        if (cardapioEmEdicao) {
        setNomeCardapio(cardapioEmEdicao.nome_cardapio);
        setDescricaoCardapio(cardapioEmEdicao.descricao_cardapio);
        setStatus(cardapioEmEdicao.status);

        }
    }, [isOpen]); 

    if (!isOpen) return null;

    const handleSalvar = () => {

        onSave({ nome_cardapio, descricao_cardapio, status: Number(status)});
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Cardápio</h2>

                <form onSubmit={handleSalvar} className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Nome do Cardápio:</p>
                    <input
                    type="text"
                    value={nome_cardapio}
                    onChange={(e) => setNomeCardapio(e.target.value)}
                    placeholder="Nome do cardápio"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Descrição do Cardápio:</p>
                    <textarea
                    value={descricao_cardapio}
                    onChange={(e) => setDescricaoCardapio(e.target.value)}
                    placeholder="Descrição do cardápio"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Status (1-Ativo 2-Inativo 3-Bloqueado) :</p>
                    <input
                    type="number"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    placeholder="1-Ativo, 2-Inativo, 3-Bloqueado"
                    min={1}
                    max={3}
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
