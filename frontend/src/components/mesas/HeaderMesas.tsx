import { IAreaDTO } from "@/models/Areas"

interface HeaderMesasProps{
    area: IAreaDTO
}
export function HeaderMesas({area}: HeaderMesasProps)
{
    return(
        <>
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Reserva de Mesas
            </h1>
            <p className="text-sm text-white">
              Escolha uma mesa no mapa para iniciar a reserva.
            </p>
          </div>
          <div className="flex gap-2 text-xs text-gray-500">
            <span className="p-2 rounded-full bg-gray-100 border-gray-200 border-2">
              Restaurante: <strong className="ml-1">Restaurante Demo</strong>
            </span>
            <span className="p-2 rounded-full bg-gray-100 border-2 border-gray-200">
              Área: <strong className="ml-1">{area?.nome_area}</strong>
            </span>
          </div>
        </header>
        </>
    )
}