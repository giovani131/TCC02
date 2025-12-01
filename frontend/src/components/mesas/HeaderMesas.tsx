import { IAreaDTO } from "@/models/Areas"
import { Plus, Settings } from "lucide-react"

interface HeaderMesasProps{
    area: IAreaDTO
    openModal: () => void;
}
export function HeaderMesas({ area, openModal }: HeaderMesasProps)
{
    return(
        <>
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {area?.nome_area}
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
            <button onClick={openModal} className="flex flex-row p-2 rounded-[18px] text-white text-[12px] justify-between cursor-pointer items-center" title="Configuracoes"> <Settings /> </button>
          </div>
        </header>
        </>
    )
}