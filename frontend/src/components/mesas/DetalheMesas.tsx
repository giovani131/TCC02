import { IMesaDTO } from "@/models/Mesa"

interface DetalhesMesasProps{
    mesaSelecionada: IMesaDTO
}
export function DetalhesMesas({mesaSelecionada}: DetalhesMesasProps)
{
    return(
        <>
                <div className="space-y-2 text-sm">
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                    <p className="text-xs text-gray-500">Mesa selecionada</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mesaSelecionada.codigo_mesa}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Capacidade:{" "}
                      <span className="font-medium text-gray-800">
                        {mesaSelecionada.capacidade_maxima} pessoas
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Posição na área:{" "}
                      <span className="font-medium text-gray-800">
                        ({mesaSelecionada.pos_x}, {mesaSelecionada.pos_y})
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Status:{" "}
                      <span className="font-medium text-gray-800">
                        {mesaSelecionada.status === 1
                          ? "Livre"
                          : mesaSelecionada.status === 2
                          ? "Reservada"
                          : "Ocupada"}
                      </span>
                    </p>
                  </div>
                </div>
        </>
    )
}