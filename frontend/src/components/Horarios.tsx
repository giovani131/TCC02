export default function Horarios() {

  return (
    <div className="flex flex-col p-2 gap-3">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Horarios</h2>
          <button className="bg-purple-500 p-2 rounded text-white text-[14px] hover:bg-purple-600 cursor-pointer">Adicionar horario</button>
        </div>
        <div className="border-2 border-purple-500 rounded-lg overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-2">Dia da Semana</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Abertura</th>
                <th className="px-4 py-2">Fechamento</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-purple-50">
                <td className="px-4 py-2">Segunda-feira</td>
                <td className="px-4 py-2">Janta</td>
                <td className="px-4 py-2">18:00</td>
                <td className="px-4 py-2">23:00</td>
              </tr>
              <tr className="border-b hover:bg-purple-50">
                <td className="px-4 py-2">Segunda-feira</td>
                <td className="px-4 py-2">Almoco</td>
                <td className="px-4 py-2">11:50</td>
                <td className="px-4 py-2">15:50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
}
