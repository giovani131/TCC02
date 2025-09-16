"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import ModalApagaItem from "@/components/cardapio/ModalApagaItem";

type ItemCardapio = {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
};

export default function Cardapio() {
  const [activeTab, setActiveTab] = useState<
    "entradas" | "principais" | "sobremesas" | "bebidas"
  >("entradas");

  // Dados mocados
  const [itens, setItens] = useState<Record<string, ItemCardapio[]>>({
    entradas: [
      { id: 1, nome: "Bruschetta", descricao: "Pão italiano com tomate e manjericão", preco: "R$ 18,00" },
      { id: 2, nome: "Salada Caesar", descricao: "Alface, frango grelhado e molho Caesar", preco: "R$ 25,00" },
    ],
    principais: [
      { id: 3, nome: "Pizza Margherita", descricao: "Massa artesanal, molho de tomate e manjericão fresco", preco: "R$ 35,00" },
      { id: 4, nome: "Lasanha Bolonhesa", descricao: "Massa fresca, molho bolonhesa e queijo gratinado", preco: "R$ 42,00" },
    ],
    sobremesas: [
      { id: 5, nome: "Tiramisù", descricao: "Clássico italiano com café e mascarpone", preco: "R$ 22,00" },
      { id: 6, nome: "Petit Gâteau", descricao: "Bolo de chocolate com casquinha crocante e recheio cremoso", preco: "R$ 28,00" },
    ],
    bebidas: [
      { id: 7, nome: "Suco Natural", descricao: "Suco feito na hora, sabor à escolha", preco: "R$ 8,00" },
      { id: 8, nome: "Refrigerante", descricao: "Lata 350ml", preco: "R$ 6,00" },
    ],
  });

  // Estados para os modais
  const [modalApagarOpen, setModalApagarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false); // futuro
  const [modalOutroOpen, setModalOutroOpen] = useState(false);   // futuro

  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cardápio</h2>

      {/* Tabs + botão adicionar */}
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <div className="flex gap-4">
          {["entradas", "principais", "sobremesas", "bebidas"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-purple-600 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
          onClick={() => alert("Futuramente: adicionar novo item")}
        >
          <PlusCircle className="w-4 h-4" />
          Adicionar Item
        </button>
      </div>

      {/* Conteúdo com animação */}
      <div className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {itens[activeTab].map((item) => (
              <li
                key={item.id}
                className="border rounded-lg p-3 hover:shadow flex justify-between items-start"
              >
                <div>
                  <span className="block font-semibold">{item.nome}</span>
                  <span className="block text-sm text-gray-600">{item.descricao}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-purple-600">{item.preco}</span>
                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setItemSelecionado(item.id);
                      setModalApagarOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Modal de confirmação para apagar */}
      <ModalApagaItem
        isOpen={modalApagarOpen}
        onClose={() => {
          setModalApagarOpen(false);
          setItemSelecionado(null);
        }}
        onConfirm={() => {
          if (itemSelecionado !== null) {
            setItens({
              ...itens,
              [activeTab]: itens[activeTab].filter((i) => i.id !== itemSelecionado),
            });
          }
          setModalApagarOpen(false);
          setItemSelecionado(null);
        }}
        message="Tem certeza que deseja apagar este item?"
      />
    </div>
  );
}
