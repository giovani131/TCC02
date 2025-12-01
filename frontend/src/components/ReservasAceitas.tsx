import { useState } from "react";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

interface ReservaAceita {
  id: string;
  nome: string;
  data: string;      // "2025-11-30"
  horario: string;   // "19:00"
  pessoas: number;
  mesa?: string;
  valorTotal?: number;
}

const mockReservasAceitas: ReservaAceita[] = [
  {
    id: "1",
    nome: "Matheus Miura",
    data: "2025-11-30",
    horario: "19:00",
    pessoas: 4,
    mesa: "Mesa 12",
    valorTotal: 230.5,
  },
  {
    id: "2",
    nome: "Ana Souza",
    data: "2025-11-30",
    horario: "20:30",
    pessoas: 2,
    mesa: "Mesa 5",
    valorTotal: 120.0,
  },
  {
    id: "3",
    nome: "Carlos Lima",
    data: "2025-12-01",
    horario: "18:30",
    pessoas: 6,
    mesa: "Mesa 3",
    valorTotal: 460.9,
  },
];

export function ReservasAceitas() {
  const [dataFiltro, setDataFiltro] = useState<string>("");
  const [horaFiltro, setHoraFiltro] = useState<string>("");

  const reservasFiltradas = mockReservasAceitas.filter((reserva) => {
    const matchData = dataFiltro ? reserva.data === dataFiltro : true;
    const matchHora = horaFiltro ? reserva.horario >= horaFiltro : true;
    return matchData && matchHora;
  });

  function limparFiltros() {
    setDataFiltro("");
    setHoraFiltro("");
  }

  return (
    <div className="w-full p-4 rounded-xl bg-white shadow-md border border-gray-200 flex flex-col gap-4">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Reservas Aceitas</h2>
          <p className="text-xs text-gray-500">
            Visualize as reservas confirmadas com filtro por data e horário.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filtro por data */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              Data da reserva
            </span>
            <input
              type="date"
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Filtro por horário */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" />
              Horário a partir de
            </span>
            <input
              type="time"
              value={horaFiltro}
              onChange={(e) => setHoraFiltro(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
        </div>

        {/* Botão limpar */}
        <button
          type="button"
          onClick={limparFiltros}
          className="text-xs mt-1 inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-50"
        >
          Limpar filtros
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Cliente
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Data
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Horário
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Pessoas
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Mesa
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Valor Total
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {reservasFiltradas.map((reserva, index) => (
              <tr
                key={reserva.id}
                className={`border-b cursor-pointer hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                // onClick={() => abrirModal(reserva)}
              >
                <td className="py-3 px-4 text-gray-800 font-medium">
                  {reserva.nome}
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {reserva.data.split("-").reverse().join("/")}
                </td>

                <td className="py-3 px-4 text-gray-700">{reserva.horario}</td>

                <td className="py-3 px-4 text-gray-700">{reserva.pessoas}</td>

                <td className="py-3 px-4 text-gray-700">
                  {reserva.mesa ?? "-"}
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {reserva.valorTotal !== undefined
                    ? reserva.valorTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"}
                </td>

                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-[11px] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Aceita
                  </span>
                </td>
              </tr>
            ))}

            {reservasFiltradas.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 px-4 text-center text-gray-500 text-sm italic"
                >
                  Nenhuma reserva aceita encontrada para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
