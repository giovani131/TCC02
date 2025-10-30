import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

  // PUXA OS DADOS DO RESTAURANTE
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

  // PUXA OS CARDAPIOS
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

  // PUXA AS SESSOES
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

  // PUXA OS ITENS
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
    <div className="bg-purple-50 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center mb-6">
        {dadosRestaurante?.logo && (
          <img
            src={dadosRestaurante.logo}
            alt={`${dadosRestaurante.nome_restaurante} Logo`}
            className="w-24 h-24 object-cover rounded-full mb-4 shadow-md"
          />
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          {dadosRestaurante?.nome_restaurante || "Restaurante"}
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-3xl mx-auto min-h-[420px] sm:min-h-[480px] flex flex-col transition-all duration-300">
        <div className="flex justify-around border-b mb-6 pb-2">
          {[
            { id: "informacoes", label: "Informações"},
            { id: "cardapio", label: "Cardápio" },
            { id: "horarios", label: "Horários" },
            { id: "mesas", label: "Mesas"},
            { id: "reserva", label: "Reserva" }
          ].map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`pb-2 px-4 text-sm sm:text-base font-medium border-b-2 transition-colors duration-300 ${
                abaAtiva === aba.id
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-purple-600"
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>

        <div className="text-gray-700 flex-1 overflow-auto transition-all duration-300 max-h-[50vh]">

          {abaAtiva === "informacoes" && dadosRestaurante && (
            <section className="flex flex-col sm:flex-row gap-6 min-h-[50vh]">
              <div className="flex-1 flex flex-col gap-4 bg-purple-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">Informações da Casa</h3>

                <div className="mb-2">
                  <p className="font-medium text-gray-700 mb-1">Descrição:</p>
                  <p className="text-gray-600 text-sm line-clamp-5 overflow-hidden">
                    {dadosRestaurante.descricao_restaurante}
                  </p>
                </div>
                <p><span className="font-medium text-gray-700">Especialidade:</span> {dadosRestaurante.especialidade}</p>
                <p><span className="font-medium text-gray-700">Meios de pagamento:</span> {dadosRestaurante.meios_pagamento.join(", ")}</p>
                <p><span className="font-medium text-gray-700">Tipo de serviço:</span> {dadosRestaurante.tipos_servico.join(", ")}</p>
                <p><span className="font-medium text-gray-700">Telefone:</span> {dadosRestaurante.telefone_restaurante}</p>
              </div>
              <div className="flex-1 flex flex-col gap-3 bg-purple-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">Endereço</h3>
                <p><span className="font-medium text-gray-700">Rua:</span> {dadosRestaurante.endereco_rua}</p>
                <p><span className="font-medium text-gray-700">Número:</span> {dadosRestaurante.endereco_num}</p>
                <p><span className="font-medium text-gray-700">Bairro:</span> {dadosRestaurante.endereco_bairro}</p>
                <p><span className="font-medium text-gray-700">Cidade:</span> {dadosRestaurante.endereco_cidade}</p>
                <p><span className="font-medium text-gray-700">Estado:</span> {dadosRestaurante.endereco_estado}</p>
                <p><span className="font-medium text-gray-700">CEP:</span> {dadosRestaurante.endereco_cep}</p>
              </div>
            </section>
          )}

          {abaAtiva === "cardapio" && (
            <section className="flex flex-col gap-4 max-h-[50vh] min-h-[50vh]">
              <h2 className="text-lg font-semibold ">Cardápio</h2>

              {listaCardapios.length > 0 ? (
                <div className="mb-4 flex gap-5">
                  <select
                    value={cardapioSelecionado}
                    onChange={(e) => setCardapioSelecionado(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                  >
                    {listaCardapios.map((cardapio) => (
                      <option key={cardapio.id} value={cardapio.id}>
                        {cardapio.nome_cardapio}
                      </option>
                    ))}
                  </select>

                  <p className="text-gray-600 text-sm italic mt-3 max-w-xs truncate">
                    {listaCardapios.find((c) => String(c.id) === cardapioSelecionado)?.descricao_cardapio || ""}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 italic">Nenhum cardápio encontrado</p>
              )}

              <div className="flex gap-4 mb-4">
                {sessoes.length > 0 ? (
                  sessoes.map((sessao) => (
                    <button
                      key={sessao.id}
                      onClick={() => setSessaoAtiva(sessao.id)}
                      className={`pb-2 px-3 transition-colors duration-300 ${
                        sessaoAtiva === sessao.id
                          ? "border-b-2 border-purple-600 text-gray-800 font-semibold"
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

              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-h-[50vh] overflow-y-auto">
                {itens.length > 0 ? (
                  itens.map((item) => (
                    <li key={item.id} className="border rounded-lg p-3 flex flex-col items-center gap-3">
                      {item.imagem && (
                        <img
                          src={item.imagem}
                          alt={item.nome_item}
                          className="w-24 h-24 rounded-md object-cover"
                        />
                      )}
                      <span className="font-semibold text-center">{item.nome_item}</span>
                      <span className="text-sm text-gray-600 text-center">{item.descricao_item}</span>
                      <span className="font-bold text-purple-600">R$ {Number(item.preco_item).toFixed(2)}</span>
                    </li>
                  ))
                ) : (
                  <li className="col-span-full text-center text-gray-400 italic py-10">
                    Nenhum item encontrado
                  </li>
                )}
              </ul>
            </section>
          )}


          {abaAtiva === "horarios" && (
            <section className="min-h-[50vh]">
              <h2 className="text-lg font-semibold mb-2">Horários</h2>
              <p>Aqui serão mostrados os horários de funcionamento.</p>
            </section>
          )}

          {abaAtiva === "mesas" && (
            <section className="min-h-[50vh]">
              <h2 className="text-lg font-semibold mb-2">Mesas</h2>
              <p>Aqui serão mostrados as mesas disponiveis.</p>
            </section>
          )}

          {abaAtiva === "reserva" && (
            <section className="flex flex-col gap-6 min-h-[50vh]">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">Data:</label>
                  <input
                    type="date"
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">Hora:</label>
                  <input
                    type="time"
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Quantidade de Pessoas:</label>
                <input
                  type="number"
                  placeholder="Quantidade de Pessoas"
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">Nome do Responsável:</label>
                  <input
                    type="text"
                    placeholder="Nome do Responsável"
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">Telefone do Responsável:</label>
                  <input
                    type="text"
                    placeholder="Telefone do Responsável"
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <button className="w-[40%] mx-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-all">
                Confirmar Reserva
              </button>
            </section>
          )}

        </div>
      </div>


      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
      >
        Voltar
      </button>
    </div>
  );
}
