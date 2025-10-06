import { useState, useEffect } from "react";
import ModalApagarItem from "./ModalApagarItem";
import ModalEditarItem from "./ModalAdicionarItem";
import ModalAdicionarItem from "./ModalAdicionarItem";
import ModalCriarCardapio from "./ModalCriarCardapio";
import ModalCriarSessao from "./ModalCriarSessao";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function Cardapio() {
  
  const [cardapioSelecionado, setCardapioSelecionado] = useState("");
  const [listaCardapios, setListaCardapios] = useState<{ id: number; nome_cardapio: string }[]>([])
  const [sessoes, setSessoes] = useState<{ id: number; nome_sessao: string }[]>([]);
  const [sessaoAtiva, setSessaoAtiva] = useState<number | null>(null);
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);
  const [itens, setItens] = useState<{id: number; nome_item: string; descricao_item: string; preco_item: number; imagem: string, visivel: boolean}[]>([])


  const [modalApagarOpen, setModalApagarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false);
  const [modalCriarCardapioOpen, setModalCriarCardapioOpen] = useState(false);
  const [modalCriarSessaoOpen, setModalCriarSessaoOpen] = useState(false);

  // Buscar cardápios no backend ao montar
  useEffect(() => {
    const fetchCardapios = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5500/api/listarCardapiosPorId", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar cardápios");
        }

        const data = await res.json();
        setListaCardapios(data);
        if (data.length > 0){
          const cardapioInicial = String(data[0].id)
          setCardapioSelecionado(cardapioInicial);
        }
      } catch (err) {
        console.error("Erro ao carregar cardápios:", err);
      }
    };

    fetchCardapios();
  }, []);

  useEffect(() => {
    if (!cardapioSelecionado) return;

    const fetchSessoes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:5500/api/listarSessoesPorCardapio/${cardapioSelecionado}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar sessões");

        const data = await res.json();
        setSessoes(data);
        if (data.length > 0){ 
          setSessaoAtiva(data[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar sessões:", err);
      }
    };
    fetchSessoes();
  }, [cardapioSelecionado]);

  useEffect(() => {
    if (!sessaoAtiva) return;

    const fetchSessoes = async () => {

      try {
        const res = await fetch(`http://localhost:5500/api/listarItensPorSessao/${sessaoAtiva}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar itens");

        const data = await res.json();
        console.log(data)
        setItens(data);
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
      }
    };
    fetchSessoes();
  }, [sessaoAtiva]);



  // Função para criar cardápio
  const handleCreateCardapio = async (formData: { nome_cardapio: string; descricao_cardapio: string; status: number }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5500/api/cadastrarCardapio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, tipo: "cardapio" }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Cardápio criado com sucesso!");
        setModalCriarCardapioOpen(false);
        setListaCardapios((prev) => [...prev, data.cardapio]);
        setCardapioSelecionado(data.cardapio.id);
      } else {
        alert(data.message || "Erro ao cadastrar cardápio");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com servidor");
    }
  };

  const handleCreateSessao = async (dados: { nome_sessao: string; ordem: number }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5500/api/cadastrarSessao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_sessao: dados.nome_sessao,
          ordem: dados.ordem,
          cardapio_id: Number(cardapioSelecionado)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao criar sessão");
      }
      setSessoes((prev) => [...prev, data.sessao]);
    } catch (err) {
      console.error("ERRO:",err);
      alert("Erro ao criar sessão");
    }
  };

    const handleCreateItem = async (dados: { nome_item: string, descricao_item: string, preco_item: number, imagem: File, visivel: boolean }) => {
      try {
      const token = localStorage.getItem("token");

      const fileToBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const imagemBase64 = await fileToBase64(dados.imagem);

      const res = await fetch("http://localhost:5500/api/cadastrarItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_item: dados.nome_item,
          descricao_item: dados.descricao_item,
          preco_item: dados.preco_item,
          imagem: imagemBase64,
          visivel: dados.visivel,
          cardapio_sessao_id: sessaoAtiva
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Erro ao criar item");
      }
    } catch (err) {
      console.error("ERRO:",err);
      alert("Erro ao criar item");
    }
  };


  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <select
            id="cardapioSelect"
            value={cardapioSelecionado}
            onChange={(e) => setCardapioSelecionado(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {listaCardapios.length > 0 ? (
              listaCardapios.map((cardapio) => (
                <option key={cardapio.id} value={cardapio.id}>
                  {cardapio.nome_cardapio}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Nenhum cardápio encontrado
              </option>
            )}
          </select>

          <button
            onClick={() => setModalCriarCardapioOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition w-44"
          >
            <PlusCircle className="w-4 h-4" />
            Criar cardápio
          </button>
        </div>
       
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <div className="flex gap-4">
            {sessoes.length > 0 ? (
              sessoes.map((sessao) => (
                <button
                  key={sessao.id}
                  onClick={() => setSessaoAtiva(sessao.id)}
                  className={`pb-2 px-3 transition-colors duration-300 ${
                    sessaoAtiva === sessao.id
                      ? "border-b-2 border-purple-600 text-gray-500 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {sessao.nome_sessao}
                </button>
              ))
            ) : (
              <span className="text-gray-400 italic">Nenhuma sessão encontrada</span>
            )}
          </div>

          <button
            onClick={() => setModalCriarSessaoOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition w-44"
          >
            <PlusCircle className="w-4 h-4" />
            Criar sessão
          </button>
        </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-h-[470px] overflow-y-auto">
        {itens.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg p-3 hover:shadow flex flex-col justify-between w-80"
          >
            <div className="flex flex-col items-center gap-3">
              {item.imagem && (
              <img
                src={item.imagem} 
                alt="Imagem do item"
                className="w-24 h-24 rounded-md object-cover"
              />
              )}

              <span className="font-semibold text-center">{item.nome_item}</span>
              <span className="text-sm text-gray-600 text-center">{item.descricao_item}</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-purple-600">
                R$ {Number(item.preco_item).toFixed(2)}
              </span>

              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setItemSelecionado(item.id);
                    setModalEditarOpen(true);
                  }}
                  aria-label={`Editar ${item.nome_item}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setItemSelecionado(item.id);
                    setModalApagarOpen(true);
                  }}
                  aria-label={`Apagar ${item.nome_item}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setModalAdicionarOpen(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Adicionar item
          </button>
        </div>
      </div>


      {/* Modais */}
      <ModalApagarItem
        isOpen={modalApagarOpen}
        onClose={() => {
          setModalApagarOpen(false);
          setItemSelecionado(null);
        }}
        onConfirm={() => {
          setModalApagarOpen(false);
          setItemSelecionado(null);
        }}
      />
      <ModalEditarItem
        isOpen={modalEditarOpen}
        onClose={() => {
          setModalEditarOpen(false);
          setItemSelecionado(null);
        }}
        onSave={() => {
          setModalEditarOpen(false);
          setItemSelecionado(null);
        }}
      />
      <ModalAdicionarItem
        isOpen={modalAdicionarOpen}
        onClose={() => setModalAdicionarOpen(false)}
        onSave={handleCreateItem}
      />
      <ModalCriarCardapio
        isOpen={modalCriarCardapioOpen}
        onClose={() => setModalCriarCardapioOpen(false)}
        onSave={handleCreateCardapio}
      />
      <ModalCriarSessao
        isOpen={modalCriarSessaoOpen}
        onClose={() => setModalCriarSessaoOpen(false)}
        onSave={handleCreateSessao}
      />
    </div>
  );
}
