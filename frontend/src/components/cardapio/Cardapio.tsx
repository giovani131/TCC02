import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import ModalApagarItem from "@/components/cardapio/ModalApagarItem";
import ModalEditarItem from "@/components/cardapio/ModalEditarItem";
import ModalAdicionarItem from "./ModalAdicionarItem";

type ItemCardapio = {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  img: string;
};

type Categoria = {
  id: number;
  nome_categoria: string;
  ordem: number;
  itens: ItemCardapio[];
};

type Cardapio = {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  categorias: Categoria[];
};

export default function Cardapio() {
  const [cardapios] = useState<Cardapio[]>([
    {
      id: 1,
      nome: "Cardápio Principal",
      descricao: "Cardápio padrão do restaurante",
      status: "ativo",
      categorias: [
        {
          id: 1,
          nome_categoria: "Entradas",
          ordem: 1,
          itens: [
            { id: 1, nome: "Bruschetta", descricao: "Pão italiano com tomate e manjericão", preco: "R$ 18,00", img: "/imagens/bruscheta.jpg" },
            { id: 2, nome: "Salada Caesar", descricao: "Alface, frango grelhado e molho Caesar", preco: "R$ 25,00", img: "/imagens/saladaCesar.jpg" },
            { id: 3, nome: "Crostini", descricao: "Pão crocante com patê", preco: "R$ 20,00", img: "/imagens/crostini.jpg" },
            { id: 4, nome: "Tomate recheado", descricao: "Tomate com queijo", preco: "R$ 22,00", img: "/imagens/tomateRecheado.jpg" },
            { id: 5, nome: "Bolinho de Bacalhau", descricao: "Bolinho frito de bacalhau", preco: "R$ 19,00", img: "/imagens/bolinho.jpg" },
            { id: 6, nome: "Queijo Coalho", descricao: "Grelhado com mel", preco: "R$ 18,00", img: "/imagens/queijo.jpg" },
            { id: 7, nome: "Mini Caprese", descricao: "Tomate, mussarela e manjericão", preco: "R$ 23,00", img: "/imagens/miniCaprese.jpg" },
            { id: 8, nome: "Espetinho de Frango", descricao: "Frango grelhado com tempero", preco: "R$ 21,00", img: "/imagens/espetinho.jpg" },
          ],
        },
      ],
    },
    {
      id: 2,
      nome: "Cardápio Especial",
      descricao: "Cardápio gourmet",
      status: "ativo",
      categorias: [
        {
          id: 2,
          nome_categoria: "Pratos Principais",
          ordem: 1,
          itens: [
            { id: 9, nome: "Filé Mignon", descricao: "Filé com molho madeira", preco: "R$ 45,00", img: "https://via.placeholder.com/80" },
            { id: 10, nome: "Salmão Grelhado", descricao: "Salmão com legumes", preco: "R$ 50,00", img: "https://via.placeholder.com/80" },
          ],
        },
        {
          id: 3,
          nome_categoria: "Sobremesas",
          ordem: 2,
          itens: [
            { id: 11, nome: "Petit Gâteau", descricao: "Bolo de chocolate com recheio cremoso", preco: "R$ 28,00", img: "https://via.placeholder.com/80" },
            { id: 12, nome: "Sorvete", descricao: "Sorvete artesanal", preco: "R$ 15,00", img: "https://via.placeholder.com/80" },
            { id: 13, nome: "Cheesecake", descricao: "Cheesecake de frutas vermelhas", preco: "R$ 22,00", img: "https://via.placeholder.com/80" },
          ],
        },
      ],
    },
  ]);

  const [cardapioSelecionado, setCardapioSelecionado] = useState<number>(1);
  const [categoriaAtiva, setCategoriaAtiva] = useState<number | null>(null);

  const [modalApagarOpen, setModalApagarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false);

  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  const cardapioAtual = cardapios.find((c) => c.id === cardapioSelecionado)!;

  useEffect(() => {
    const primeira = cardapios.find((c) => c.id === cardapioSelecionado)?.categorias?.[0];
    setCategoriaAtiva(primeira ? primeira.id : null);
  }, [cardapioSelecionado, cardapios]);

  const categoriaAtual = cardapioAtual?.categorias.find((cat) => cat.id === categoriaAtiva) ?? null;

  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* Topo */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <select
            value={cardapioSelecionado}
            onChange={(e) => setCardapioSelecionado(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            {cardapios.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition w-44"
            onClick={() => alert("Futuro: criar cardápio")}
          >
            <PlusCircle className="w-4 h-4" />
            Criar Cardápio
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <div className="flex gap-4">
            {cardapioAtual.categorias.map((cat) => (
              <button
                key={cat.id}
                className={`pb-2 px-3 ${categoriaAtiva === cat.id ? "border-b-2 border-purple-600 font-semibold" : "text-gray-500"}`}
                onClick={() => setCategoriaAtiva(cat.id)}
              >
                {cat.nome_categoria}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition w-44"
            onClick={() => alert("Futuro: adicionar categoria")}
          >
            <PlusCircle className="w-4 h-4" />
            Adicionar Categoria
          </button>
        </div>
      </div>

      {/* Área de itens com scroll vertical */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto overflow-x-hidden pr-2 mb-16">
          <AnimatePresence mode="wait">
            {categoriaAtiva ? (
              <motion.ul
                key={categoriaAtiva}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {categoriaAtual?.itens.map((item) => (
                  <li
                    key={item.id}
                    className="border rounded-lg p-3 hover:shadow flex flex-col justify-between w-full"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img src={item.img} alt={item.nome} className="w-24 h-24 rounded-md object-cover" />
                      <span className="font-semibold text-center">{item.nome}</span>
                      <span className="text-sm text-gray-600 text-center">{item.descricao}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-purple-600">{item.preco}</span>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => { setItemSelecionado(item.id); setModalEditarOpen(true); }}
                          aria-label={`Editar ${item.nome}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => { setItemSelecionado(item.id); setModalApagarOpen(true); }}
                          aria-label={`Apagar ${item.nome}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 py-6">
                Selecione uma categoria
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botão fixo embaixo */}
        {categoriaAtiva && (
          <div className="absolute bottom-0 left-0 w-full flex justify-center bg-white p-2">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
              onClick={() => setModalAdicionarOpen(true)}
            >
              <PlusCircle className="w-4 h-4" />
              Adicionar Item
            </button>
          </div>
        )}
      </div>

      {/* Modais */}
      <ModalApagarItem
        isOpen={modalApagarOpen}
        onClose={() => { setModalApagarOpen(false); setItemSelecionado(null); }}
        onConfirm={() => { setModalApagarOpen(false); setItemSelecionado(null); }}
      />
      <ModalEditarItem
        isOpen={modalEditarOpen}
        onClose={() => { setModalEditarOpen(false); setItemSelecionado(null); }}
        onSave={() => { setModalEditarOpen(false); setItemSelecionado(null); }}
      />
      <ModalAdicionarItem
        isOpen={modalAdicionarOpen}
        onClose={() => setModalAdicionarOpen(false)}
        onSave={() => { setModalAdicionarOpen(false); }}
      />
    </div>
  );
}
