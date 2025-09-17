import { useState } from "react";

type DiaSemana = {
  nome: string;
  aberto: boolean;
  abertura: string;
  fechamento: string;
};

export default function Horarios() {
  const [dias, setDias] = useState<DiaSemana[]>([
    { nome: "Segunda-feira", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Terça-feira", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Quarta-feira", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Quinta-feira", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Sexta-feira", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Sábado", aberto: false, abertura: "00:00", fechamento: "00:00" },
    { nome: "Domingo", aberto: false, abertura: "00:00", fechamento: "00:00" },
  ]);

  const atualizarDia = (index: number, campo: keyof DiaSemana, valor: string | boolean) => {
    const novosDias = [...dias];
    // @ts-ignore
    novosDias[index][campo] = valor;
    setDias(novosDias);
  };

  const salvarHorarios = () => {
    console.log("Horários salvos:", dias);
    // futuramente aqui você manda para o backend
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-10">Dias e Horários de Funcionamento</h2>

      <div className="border-2 border-purple-500 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-100 text-gray-800">
              <th className="p-3 text-center">Dia</th>
              <th className="p-3 text-center">Aberto?</th>
              <th className="p-3 text-center">Abertura</th>
              <th className="p-3 text-center">Fechamento</th>
            </tr>
          </thead>
          <tbody>
            {dias.map((dia, index) => (
              <tr
                key={dia.nome}
                className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
              >
                <td className="p-3 font-medium text-center">{dia.nome}</td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={dia.aberto}
                    onChange={(e) => atualizarDia(index, "aberto", e.target.checked)}
                    className="cursor-pointer accent-purple-500 w-5 h-5"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="time"
                    value={dia.abertura}
                    onChange={(e) => atualizarDia(index, "abertura", e.target.value)}
                    disabled={!dia.aberto}
                    className="border border-purple-400 rounded px-2 py-1 w-24 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="time"
                    value={dia.fechamento}
                    onChange={(e) => atualizarDia(index, "fechamento", e.target.value)}
                    disabled={!dia.aberto}
                    className="border border-purple-400 rounded px-2 py-1 w-24 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={salvarHorarios}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
