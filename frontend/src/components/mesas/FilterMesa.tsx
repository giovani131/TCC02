import { CalendarDays, Clock, MapPin, Users, Filter, CheckCircle2, XCircle } from "lucide-react";

export function FiltroMesasSidebar() {
  return (
    <aside className="w-80 min-w-[280px] max-w-xs border-l border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtro de Mesas
          </h2>
          <p className="text-xs text-white/60">
            Encontre mesas livres por horário e capacidade.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-white/60">Data e horário desejados</span>

        <div className="flex flex-col gap-2">
          {/* Data */}
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            <CalendarDays className="w-4 h-4 text-white/60" />
            <input
              type="date"
              className="w-full bg-transparent text-xs text-white placeholder:text-white/40 outline-none"
              // onChange={...}
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            <Clock className="w-4 h-4 text-white/60" />
            <input
              type="time"
              className="w-full bg-transparent text-xs text-white placeholder:text-white/40 outline-none"
              // onChange={...}
            />
          </label>
        </div>

        <p className="text-[11px] text-white/50">
          O sistema irá buscar mesas onde esse horário esteja <span className="font-semibold text-emerald-200">livre</span>.
        </p>
      </div>


      <div className="mt-2 flex flex-col gap-2">
        <button
          type="button"
          className="
            w-full rounded-xl bg-indigo-500/90 hover:bg-indigo-400
            text-xs font-semibold text-white py-2.5
            flex items-center justify-center gap-2
          "
        >
          <Filter className="w-4 h-4" />
          Aplicar filtros
        </button>

        <button
          type="button"
          className="
            w-full rounded-xl border border-white/15 bg-transparent hover:bg-white/5
            text-[11px] font-normal text-white/70 py-2
          "
        >
          Limpar filtros
        </button>
      </div>
    </aside>
  );
}
