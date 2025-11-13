import { DetalhesMesas } from "@/components/mesas/DetalheMesas";
import { HeaderMesas } from "@/components/mesas/HeaderMesas";
import { LegendaMesas } from "@/components/mesas/LegendaMesas";
import { ModalCriarMesa } from "@/components/mesas/ModalCriarMesa";
import { ReservasPendentesMesas } from "@/components/mesas/ReservasPendentesMesas";
import { Input } from "@/core/components/Input";
import { IAreaDTO } from "@/models/Areas";
import { IMesaDTO } from "@/models/Mesa";
import { getAreaById } from "@/services/area.services";
import { listar } from "@/services/mesa.services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AreaReservaMock() {
  const router = useRouter()
  const [pos_x, setPos_x] = useState(0)
  const [pos_y, setPos_y] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const { id } = router.query;
  const [selectedMesaId, setSelectedMesaId] = useState<number | null>(null);
  const [area, setArea] = useState<IAreaDTO>()
  const [mesasData, setMesas] = useState<IMesaDTO[]>([])
    useEffect(() => {
        async function fetchArea()
        {
            try{
                const mesas = await listar(id?.toString()!)
                const res = await getAreaById(id?.toString()!)
                setArea(res)
                setMesas(mesas)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchArea()
    }, [openModal])

  function openModalChair(pos_x: number, pos_y: number)
  {
    setPos_x(pos_x)
    setPos_y(pos_y)
    setOpenModal(true)
  }

  const getMesaAt = (x: number, y: number) =>
    mesasData.find((m) => m.pos_x === x && m.pos_y === y);

  const mesaSelecionada = selectedMesaId
    ? mesasData.find((m) => m.id === selectedMesaId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-start py-10">
      <div className="w-full max-w-5xl px-4">
        <HeaderMesas area={area!} />

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">
                Mapa de Mesas ({area?.width} x {area?.height})
              </h2>
              <span className="text-xs text-gray-500">
                Clique em uma mesa para selecionar
              </span>
            </div>

            <LegendaMesas />

            <div
              className="grid gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200"
              style={{
                gridTemplateColumns: `repeat(${area?.width}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: area?.width! * area?.height! }).map((_, index) => {
                const x = index % area?.width!;
                const y = Math.floor(index / area?.width!);
                const mesasData = getMesaAt(x, y);

                if (!mesasData) {
                  return (
                    <div
                      key={index}
                      onClick={() => openModalChair(x, y)}
                      className="h-14 rounded-xl border border-dashed cursor-pointer border-gray-200 bg-white"
                    />
                  );
                }

                const isSelected = mesasData.id === selectedMesaId;

                const colorByStatus =
                  mesasData.status === 1
                    ? "bg-emerald-100 border-emerald-300 text-emerald-900"
                    : mesasData.status === 2
                    ? "bg-amber-100 border-amber-300 text-amber-900"
                    : "bg-rose-100 border-rose-300 text-rose-900";

                return (
                  <button
                    key={mesasData.id}
                    type="button"
                    onClick={() =>
                      setSelectedMesaId(
                        mesasData.id === selectedMesaId ? null : mesasData.id
                      )
                    }
                    className={`h-14 cursor-pointer rounded-xl border text-xs flex flex-col items-center justify-center font-medium transition hover:scale-[1.02] hover:shadow-sm ${colorByStatus} ${
                      isSelected ? "ring-2 ring-indigo-500" : ""
                    }`}
                  >
                    <span>{mesasData.codigo_mesa}</span>
                    <span className="text-[11px]">
                      {mesasData.capacidade_maxima} pessoas
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">
                Detalhes da seleção
              </h2>

              {!mesaSelecionada && (
                <p className="text-sm text-gray-500">
                  Nenhuma mesa selecionada ainda. Clique em uma mesa no mapa
                  para ver os detalhes aqui.
                </p>
              )}

              {mesaSelecionada && (
                <DetalhesMesas mesaSelecionada={mesaSelecionada} />
              )} 
            </div>
            {
              mesaSelecionada?.status === 1 && 
              <>
                <ReservasPendentesMesas />
              </>
            }

            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                type="button"
                disabled={!mesaSelecionada}
                className={`w-full inline-flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  mesaSelecionada
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continuar reserva
              </button>
            </div>
          </aside>
        </div>
      </div>
      {
        openModal && <ModalCriarMesa close={() => setOpenModal(false)} pos_x={pos_x} pos_y={pos_y} />
      }
    </div>
  );
}
