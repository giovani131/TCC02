import { Input } from "@/core/components/Input";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Reserve } from "./Reserve";

export default function RestauranteDetalhes() {
  
  const router = useRouter();
  const { id_estabelecimento } = router.query;

  const [abaAtiva, setAbaAtiva] = useState("informacoes");

  const [dadosRestaurante, setDadosRestaurante] = useState<any>(null);
  const [cardapioSelecionado, setCardapioSelecionado] = useState<string>("");
  const [listaCardapios, setListaCardapios] = useState<any[]>([]);
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [sessaoAtiva, setSessaoAtiva] = useState<number | null>(null);
  const [itens, setItens] = useState<any[]>([]);
  useEffect(() => {
    if (!router.isReady || !id_estabelecimento) return;
    const fetchDados = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/estabelecimentoDadosCompletos/${id_estabelecimento}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar dados do restaurante");

        const data = await res.json();
        setDadosRestaurante(data)
      } catch (err) {
        console.error("Erro ao carregar dados do restaurante:", err);
      }
    };
    fetchDados();
  }, [router.isReady, id_estabelecimento]);

  useEffect(() => {
    if (!router.isReady || !id_estabelecimento) return;
    console.log(id_estabelecimento)
    const fetchCardapios = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/listarCardapiosPorIdCliente/${id_estabelecimento}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Erro ao buscar cardápios");
        const data = await res.json();
        setListaCardapios(data);

        if (data.length > 0) {
          setCardapioSelecionado(String(data[0].id));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCardapios();
  }, [router.isReady,id_estabelecimento]);
  useEffect(() => {
    if (!cardapioSelecionado) return;
    const fetchSessoes = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/listarSessoesPorCardapio/${cardapioSelecionado}`, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` 
          },
          
        });
        if (!res.ok) throw new Error("Erro ao buscar sessões");
        const data = await res.json();
        setSessoes(data);

        if (data.length > 0) {
          setSessaoAtiva(data[0].id);
        } else {
          setSessaoAtiva(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessoes();
  }, [cardapioSelecionado]);

  useEffect(() => {
    if (!sessaoAtiva) {
      setItens([]);
      return;
    }

    const fetchItens = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/listarItensPorSessao/${sessaoAtiva}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Erro ao buscar itens");
        const data = await res.json();
        setItens(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItens();
  }, [sessaoAtiva]);

  return (
<div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-white">
  {/* HEADER */}
  <header className="relative">
    {/* faixa ilustrativa (pode virar cover do restaurante se você tiver) */}
    <div className="h-36 sm:h-44 bg-gradient-to-r from-purple-500 to-fuchsia-500" />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-14 sm:-mt-16">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {dadosRestaurante?.logo ? (
          <img
            src={dadosRestaurante.logo}
            alt={`${dadosRestaurante.nome_restaurante} Logo`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white shadow-md"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-200 ring-4 ring-white grid place-content-center text-purple-700 font-bold">
            {dadosRestaurante?.nome_restaurante?.[0] ?? "R"}
          </div>
        )}

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {dadosRestaurante?.nome_restaurante || "Restaurante"}
          </h1>
          <p className="text-gray-600 mt-1 line-clamp-2">
            {dadosRestaurante?.descricao_restaurante || "Bem-vindo! Explore nosso cardápio e faça sua reserva."}
          </p>

          {/* chips rápidos */}
          <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
            {dadosRestaurante?.especialidade && (
              <span className="text-xs sm:text-sm bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">
                {dadosRestaurante.especialidade}
              </span>
            )}
            {dadosRestaurante?.tipos_servico?.length > 0 && (
              <span className="text-xs sm:text-sm bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-full">
                {dadosRestaurante.tipos_servico.join(" • ")}
              </span>
            )}
            {dadosRestaurante?.telefone_restaurante && (
              <span className="text-xs sm:text-sm bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-full">
                {dadosRestaurante.telefone_restaurante}
              </span>
            )}
              <span className="text-xs sm:text-sm bg-green-200 text-gray-700 border border-gray-200 px-3 py-1 rounded-full">
                Avalicao: 4.8
              </span>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  </header>

  {/* ABAS */}
  <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
    <nav
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-2 flex flex-wrap gap-2 sticky top-0 z-10"
      role="tablist"
      aria-label="Seções do restaurante"
    >
      {[
        { id: "informacoes", label: "Informações" },
        { id: "cardapio", label: "Cardápio" },
        { id: "horarios", label: "Horários" },
        { id: "reserva", label: "Reserva" },
        { id: "avaliacao", label: "Avaliações" }
      ].map((aba) => {
        const active = abaAtiva === aba.id;
        return (
          <button
            key={aba.id}
            role="tab"
            aria-selected={active}
            aria-controls={`panel-${aba.id}`}
            onClick={() => setAbaAtiva(aba.id)}
            className={[
              "px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base transition",
              active
                ? "bg-purple-600 text-white shadow"
                : "text-gray-700 hover:bg-purple-50",
            ].join(" ")}
          >
            {aba.label}
          </button>
        );
      })}
    </nav>

    {/* CONTEÚDO */}
    <section className="mt-4">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        {/* INFORMACOES */}
        {abaAtiva === "informacoes" && dadosRestaurante && (
          <div id="panel-informacoes" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Informações da Casa</h3>

              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="font-medium text-gray-800 mb-1">Descrição</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dadosRestaurante.descricao_restaurante}
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Especialidade</dt>
                  <dd className="text-gray-800 font-medium">{dadosRestaurante.especialidade}</dd>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Meios de pagamento</dt>
                  <dd className="text-gray-800">{dadosRestaurante.meios_pagamento.join(", ")}</dd>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Tipos de serviço</dt>
                  <dd className="text-gray-800">{dadosRestaurante.tipos_servico.join(", ")}</dd>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Telefone</dt>
                  <dd className="text-gray-800">{dadosRestaurante.telefone_restaurante}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Endereço</h3>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">Rua</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_rua}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">Número</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_num}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">Bairro</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_bairro}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">Cidade</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_cidade}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">Estado</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_estado}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">CEP</dt>
                    <dd className="text-gray-800">{dadosRestaurante.endereco_cep}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* CARDAPIO */}
        {abaAtiva === "cardapio" && (
          <div id="panel-cardapio" role="tabpanel" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-lg font-semibold">Cardápio</h2>

              {listaCardapios.length > 0 ? (
                <div className="flex flex-1 items-center gap-3">
                  <select
                    value={cardapioSelecionado}
                    onChange={(e) => setCardapioSelecionado(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none w-full sm:w-auto"
                  >
                    {listaCardapios.map((cardapio) => (
                      <option key={cardapio.id} value={cardapio.id}>
                        {cardapio.nome_cardapio}
                      </option>
                    ))}
                  </select>

                  <p className="text-gray-600 text-sm italic truncate">
                    {listaCardapios.find((c) => String(c.id) === cardapioSelecionado)?.descricao_cardapio || ""}
                  </p>
                </div>
              ) : (
                <span className="text-gray-400 italic">Nenhum cardápio encontrado</span>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {sessoes.length > 0 ? (
                  sessoes.map((sessao) => {
                    const active = sessaoAtiva === sessao.id;
                    return (
                      <button
                        key={sessao.id}
                        onClick={() => setSessaoAtiva(sessao.id)}
                        className={[
                          "px-3 py-2 rounded-xl whitespace-nowrap transition",
                          active
                            ? "bg-purple-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        ].join(" ")}
                      >
                        {sessao.nome_sessao}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-gray-400 italic">Nenhuma sessão encontrada</span>
                )}
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {itens.length > 0 ? (
                  itens.map((item) => (
                    <li
                      key={item.id}
                      className="border rounded-2xl p-3 hover:shadow-lg transition bg-white"
                    >
                      {item.imagem && (
                        <img
                          src={item.imagem}
                          alt={item.nome_item}
                          className="w-full h-36 rounded-xl object-cover"
                        />
                      )}
                      <div className="mt-3">
                        <div className="font-semibold text-gray-900">{item.nome_item}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{item.descricao_item}</div>
                        <div className="mt-2 font-bold text-purple-700">
                          R$ {Number(item.preco_item).toFixed(2)}
                        </div>
                      </div>

                    </li>
                  ))
                ) : (
                  <li className="col-span-full text-center text-gray-400 italic py-10">
                    Nenhum item encontrado
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* HORARIOS */}
        {abaAtiva === "horarios" && (
          <div id="panel-horarios" role="tabpanel" className="space-y-3">
            <h2 className="text-lg font-semibold">Horários</h2>
            <p className="text-gray-600">Aqui serão mostrados os horários de funcionamento.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Seg a Sex</p>
                <p className="font-semibold text-gray-900">11:30–15:00 • 18:30–23:00</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Sáb e Dom</p>
                <p className="font-semibold text-gray-900">12:00–23:00</p>
              </div>
            </div>
          </div>
        )}

         {abaAtiva === "avaliacao" && (
          <div id="panel-reserva" role="tabpanel" className="space-y-6">
            <h2 className="text-lg font-semibold">Avaliações</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Mariana Costa</h3>
                      <p className="text-xs text-gray-500">Pedido #1029</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-yellow-500">
                    ★★★★☆
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    Ótimo atendimento, comida chegou quente e muito saborosa!
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/100?img=3"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">João Almeida</h3>
                      <p className="text-xs text-gray-500">Pedido #984</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-yellow-500">
                    ★★★★★
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    Atendimento excelente, voltarei com certeza.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/100?img=22"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Ana Beatriz</h3>
                      <p className="text-xs text-gray-500">Pedido #1010</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-yellow-500">
                    ★★★★☆
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    A sobremesa estava incrível! Só atrasou um pouco.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/100?img=41"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Pedro Henrique</h3>
                      <p className="text-xs text-gray-500">Pedido #990</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-yellow-500">
                    ★★★☆☆
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    O lanche estava bom, mas faltou um pouco mais de tempero.
                  </p>
                </div>
              </div>
            </div>
        )}

        {/* RESERVA */}
        {abaAtiva === "reserva" && ( <Reserve />
        )}
      </div>
    </section>
  </div>

  <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} {dadosRestaurante?.nome_restaurante || "Restaurante"} — Todos os direitos reservados
  </footer>
</div>

  );
}
