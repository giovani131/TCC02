import { useState } from "react";
import { CalendarDays, CheckCircle2, XCircle, Filter, Menu, ArrowLeftFromLine } from "lucide-react";
import { ReservaPendente } from "@/models/Reserve";
import { ReservaPendentes } from "../ReservasPendentes";

type DayFilter = "all" | "today" | "tomorrow";
type PaymentFilter = "all" | "paid" | "unpaid";

function isToday(dateStr: string) {
  const today = new Date();
  const d = new Date(dateStr);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

function isTomorrow(dateStr: string) {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const d = new Date(dateStr);
  return (
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate()
  );
}

interface ReservasPendentesProps{
    selected: ReservaPendentes | undefined
    setSelected: (select: ReservaPendentes) => void
    reservas: ReservaPendentes[]
    tipo: number
    setTipo: (tipo: number) => void;
    setStatus: (status: number) => void;
    status: number
}

export function ReservasPendentes({ selected, setSelected, reservas, tipo, setTipo, setStatus, status} : ReservasPendentesProps) {


  // const reservasFiltradas = reservas.filter((reserva) => {
  //   let okDia = true;
  //   if (dayFilter === "today") okDia = isToday(reserva.);
  //   if (dayFilter === "tomorrow") okDia = isTomorrow(reserva.data);

  //   let okPagamento = true;
  //   if (paymentFilter === "paid") okPagamento = reserva.statusPagamento === "paid";
  //   if (paymentFilter === "unpaid") okPagamento = reserva.statusPagamento === "unpaid";

  //   return okDia && okPagamento;
  // });

  return (
    <aside className="w-80 min-w-[280px] max-w-xs border-l border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Reservas Pendentes
          </h2>
          <p className="text-xs text-white/60">
            Gerencie as reservas aguardando atendimento.
          </p>
        </div>
        <ArrowLeftFromLine color="white" className="cursor-pointer"/>
      </header>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-white/60">Horario solicitado</span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => setTipo(1)}
            className={`rounded-full px-2.5 py-1 border text-[11px] ${
              tipo === 1
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Almoco
          </button>
          <button
            onClick={() => setTipo(2)}
            className={`rounded-full px-2.5 py-1 border text-[11px] ${
              tipo === 2
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Janta
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-white/60">Status</span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => setStatus(1)}
            className={`rounded-full px-2.5 py-1 border text-[11px] ${
              status === 1
                ? "border-emerald-400 bg-emerald-500/15 text-emerald-100"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Respondido
          </button>
          <button
            onClick={() => setStatus(2)}
            className={`flex items-center justify-center gap-1 rounded-full px-2.5 py-1 border text-[11px] ${
              status === 2
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            Não Respondidos
          </button>
        </div>
      </div>

      {/* Lista de reservas */}
      <div className="mt-2 flex-1 overflow-y-auto no-scrollbar space-y-2">
        {reservas.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-4 text-center text-xs text-white/60">
            Nenhuma reserva encontrada com os filtros atuais.
          </div>
        )}

        {reservas.map((reserva) => (
          <button
            key={reserva.id}
            onClick={() => setSelected(reserva)}
            className={`
              w-full text-left rounded-xl border px-3 py-3 transition flex flex-col gap-1
              ${
                selected?.id === reserva.id
                  ? "border-indigo-400 bg-indigo-500/10 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                {reserva.nome_responsavel}
              </span>
            </div>
            <span className="text-[11px] text-white/60">
                {reserva.observacao}
            </span>

            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>
                {reserva.quantidade_pessoas} pessoa(s)
              </span>
              <span>
                {reserva.tipo === 1 ? "Almoco" : "Janta"}
              </span>

              {/* {reserva.statusPagamento === "paid" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Pago
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-medium text-rose-200">
                  <XCircle className="w-3 h-3" />
                  Não pago
                </span>
              )} */}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
