import { IMesaDTO } from "@/models/Mesa"
import { ReservaPendente } from "@/models/Reserve"
import { ReservaPendentes } from "../ReservasPendentes"

interface DetalhesReservaProps{
    reservaSelecionada: ReservaPendentes | null
}
export function DetalhesReserva({    reservaSelecionada
}: DetalhesReservaProps)
{
    return(
        <>
                <div className="space-y-2 text-sm mt-3">
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                    <p className="text-xs text-gray-500">Responsavel</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {reservaSelecionada?.nome_responsavel}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Observacao:{" "}
                      <span className="font-medium text-gray-800">
                        {reservaSelecionada?.observacao}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Quantidade de pessoas:{" "}
                      <span className="font-medium text-gray-800">
                        {reservaSelecionada?.quantidade_pessoas}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Horario:{" "}
                      <span className="font-medium text-gray-800">
                        {reservaSelecionada?.tipo == 1 ? "Almoco" : "Janta"}
                      </span>
                    </p>


                  </div>
                </div>
        </>
    )
}