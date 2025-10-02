import { useState, useEffect } from "react";
import ModalApagarItem from "./ModalApagarItem";
import ModalEditarItem from "./ModalAdicionarItem";
import ModalAdicionarItem from "./ModalAdicionarItem";
import ModalCriarCardapio from "./ModalCriarCardapio";
import ModalCriarSessao from "./ModalCriarSessao";
import { Type } from "lucide-react";

export default function Cardapio() {
  const [cardapioSelecionado, setCardapioSelecionado] = useState("");
  const [listaCardapios, setListaCardapios] = useState<{ id: number; nome_cardapio: string }[]>([])
  const [sessoes, setSessoes] = useState<{ id: number; nome_sessao: string }[]>([]);
  const [sessaoAtiva, setSessaoAtiva] = useState<number | null>(null);

  const [modalApagarOpen, setModalApagarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false);
  const [modalCriarCardapioOpen, setModalCriarCardapioOpen] = useState(false);
  const [modalCriarSessaoOpen, setModalCriarSessaoOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

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
        if (data.length > 0) setSessaoAtiva(data[0].id);
        console.log(data);
      } catch (err) {
        console.error("Erro ao carregar sessões:", err);
      }
    };

    fetchSessoes();
  }, [cardapioSelecionado]);



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

      console.log("Sessão criada:", data);
      setSessoes((prev) => [...prev, data.sessao]);
    } catch (err) {
      console.error("ERRO:",err);
      alert("Erro ao criar sessão");
    }
  };


  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <select
            id="cardapioSelect"
            value={cardapioSelecionado}
            onChange={(e) => setCardapioSelecionado(e.target.value)}
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
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Criar cardápio
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setModalCriarSessaoOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Criar sessão
          </button>

          <div className="mt-4">
            {/* Abas das sessões */}
            <div className="flex gap-2 overflow-x-auto mb-4">
              {sessoes.map((sessao) => (
                <button
                  key={sessao.id}
                  onClick={() => setSessaoAtiva(sessao.id)}
                  className={`px-4 py-2 rounded transition-all duration-300 ${
                    sessaoAtiva === sessao.id
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {sessao.nome_sessao}
                </button>
              ))}
            </div>

            {/* Conteúdo da sessão ativa */}
            <div className="p-4 bg-gray-100 rounded shadow min-h-[150px] transition-all duration-500">
              {sessaoAtiva ? (
                (() => {
                  // Garantir que sessaoAtiva é number
                  const sessao = sessoes.find((s) => s.id === Number(sessaoAtiva));
                  if (!sessao) return <p>Sessão não encontrada</p>;

                  return (
                    <div key={sessao.id}>
                      <h2 className="text-lg font-bold mb-2">{sessao.nome_sessao}</h2>
                      <p>Conteúdo da sessão {sessao.nome_sessao} aparece aqui.</p>
                    </div>
                  );
                })()
              ) : (
                <p>Nenhuma sessão ativa</p>
              )}
            </div>
          </div>



        </div>

        <div className="mt-4">
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
        onSave={() => {
          setModalAdicionarOpen(false);
        }}
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
