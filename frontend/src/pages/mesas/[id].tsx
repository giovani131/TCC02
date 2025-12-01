import { DetalhesMesas } from "@/components/mesas/DetalheMesas";
import { DetalhesReserva } from "@/components/mesas/DetalhesReserva";
import { FiltroMesasSidebar } from "@/components/mesas/FilterMesa";
import { HeaderMesas } from "@/components/mesas/HeaderMesas";
import { LegendaMesas } from "@/components/mesas/LegendaMesas";
import { ModalCriarDia } from "@/components/mesas/ModalCriarDia";
import { ModalCriarMesa } from "@/components/mesas/ModalCriarMesa";
import { ModalReservaDetails } from "@/components/mesas/ModalReservaDetails";
import { ReservasPendentes } from "@/components/mesas/ReservasPendentes";
import { ReservasPendentesMesas } from "@/components/mesas/ReservasPendentesMesas";
import { ReservaPendentes } from "@/components/ReservasPendentes";
import { Input } from "@/core/components/Input";
import { Select } from "@/core/components/Select";
import { IAreaDTO } from "@/models/Areas";
import { IDayDTO } from "@/models/Day";
import { IMesaDTO } from "@/models/Mesa";
import { IReservaMesaRequest, ReservaPendente } from "@/models/Reserve";
import { getAreaById } from "@/services/area.services";
import { listDays } from "@/services/day.services";
import { listar } from "@/services/mesa.services";
import { listReservasPendents, reservaMesa } from "@/services/payment.services";
import { Filter, Menu } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

export default function AreaReservaMock() {
  const router = useRouter()
  const [pos_x, setPos_x] = useState(0)
  const [pos_y, setPos_y] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDetails, setOpenModalDetails] = useState(true)
  const [openModalDay, setOpenModalDay] = useState(false)
  const [selectedReserva, setSelectedReserva] = useState<ReservaPendentes>()
  const [reservasaw, setReservas] = useState<ReservaPendentes[]>([])
  const { id } = router.query;
  const [selectedMesaId, setSelectedMesaId] = useState<number | null>(null);
  const [status, setStatus] = useState<number>(2)
  const [tipo, setTipos] = useState<number>(1)
  const [area, setArea] = useState<IAreaDTO>()
  const [mesasData, setMesas] = useState<IMesaDTO[]>([])
  const [days, setDays] = useState<IDayDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit} = useForm<IReservaMesaRequest>()
  function formatarDataISO(iso: string | undefined) {
    if(!iso)
      return "00-00-0000"
    const data = new Date(iso);
    return data.toLocaleDateString("pt-BR");
  }

  const onSubmit = async (data: IReservaMesaRequest) => {
    setIsLoading(true)
    data.reserva_request_id = selectedReserva?.id || 0
    data.mesa_id = selectedMesaId || 0
    const response = await reservaMesa(data)
    setIsLoading(false)
    if(response.ok){
      toast.success("Reserva gerada com sucesso.")
      setSelectedMesaId(null)
    }
    else
      toast.error("Algo deu errado.")
  }
    useEffect(() => {
        async function fetchArea()
        {
            try{
                const mesas = await listar(id?.toString()!, 1)
                const res = await getAreaById(id?.toString()!)
                setArea(res)
                setMesas(mesas)
            }
            catch(err){
                console.log(err)
            }
        }
        async function listReservas(status: number, tipo: number)
        {
          try{
            const reservas = await listReservasPendents(status, tipo)
            setReservas(reservas)
          }catch(err)
          {
            console.log(err)
          }
        }
        listReservas(status, tipo)
        fetchArea()
    }, [openModal, openModalDay, tipo, status])

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


  const tipos: Record<string, number> = {
    "Almoco" : 1,
    "Janta": 2,
  }

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-start py-10">
      <ReservasPendentes selected={selectedReserva} setSelected={setSelectedReserva} reservas={reservasaw} tipo={tipo} setTipo={setTipos} setStatus={setStatus} status={status} />
      <div className="w-full max-w-5xl px-4">
        <HeaderMesas area={area!} openModal={() => setOpenModalDay(true)} />

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

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
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
                <>
                  <DetalhesMesas mesaSelecionada={mesaSelecionada} />
                  {
                    mesaSelecionada && selectedReserva && mesaSelecionada.status != 2 && (
                      <DetalhesReserva reservaSelecionada={selectedReserva} />
                    )
                  }
                </>
              )} 
              {
                
                mesaSelecionada && selectedReserva && mesaSelecionada.status != 2 && (
                  <>
                    <form>
                      <Input label={"Data"} type="date" register={register("data")} />
                      <Input label={"Hora"} type="time" register={register("hora_inicio")}/>
                      <Input label={"Comentario"} register={register("comentario")}/>
                      <Select label={"Tipo"} options={tipos} register={register("tipo")}/>
                    </form>                  
                      
                  </>
                )
              }
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              
          { mesaSelecionada && selectedReserva && mesaSelecionada.status != 2 ? 
              <button
                type="submit"
                disabled={!mesaSelecionada || isLoading}
                className={`w-full inline-flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  mesaSelecionada
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {!isLoading ? "Continuar Reserva" : <ClipLoader size={18} color="white" />}
              </button> : <button onClick={() => setOpenModalDetails(true)} className="w-full inline-flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700">Verificar Reserva</button>}
            </div>
          </form>
        </div>
      </div>
      {
        openModal && <ModalCriarMesa close={() => setOpenModal(false)} pos_x={pos_x} pos_y={pos_y} />
      }
      {
        openModalDay && <ModalCriarDia close={() => setOpenModalDay(false)} />
      }
      {
        !openModalDetails && <ModalReservaDetails close={() => setOpenModalDetails(false)} />
      }
      <ToastContainer position="top-right" />
    </div>
  );
}
