import { useRouter } from "next/router";
import { useState } from "react";

export default function RestauranteDetalhes() {
  const router = useRouter();
  const { id } = router.query;

  const [abaAtiva, setAbaAtiva] = useState("cardapio");

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Detalhes do Restaurante
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

        <div className="text-gray-700 flex-1 overflow-auto transition-all duration-300">
          {abaAtiva === "informacoes" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Informações</h2>
              <p>Aqui as informações do restaurante</p>
            </section>
          )}

          {abaAtiva === "cardapio" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Cardápio</h2>
              <p>Aqui ficarão os pratos e informações do cardápio.</p>
            </section>
          )}

          {abaAtiva === "horarios" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Horários</h2>
              <p>Aqui serão mostrados os horários de funcionamento.</p>
            </section>
          )}

          {abaAtiva === "mesas" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Mesas</h2>
              <p>Aqui serão mostrados as mesas disponiveis.</p>
            </section>
          )}

          {abaAtiva === "reserva" && (
            <section className="flex flex-col gap-6">
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
