import { Input } from "@/core/components/Input";

export function ReservasPendentesMesas()
{
    return(
        <>
            <div>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Reservas Pendentes
                  </h2>
                  <Input label={""} placeholder="Procurar por nome..."/>
                </div>
                <div>
                  <div className="mt-4 space-y-3">
                    {/* Card 1 */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          Ana Beatriz
                        </span>
                        <span className="text-xs text-gray-500">
                          Hoje • 19:30 · 2 pessoas
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Pendente de mesa
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs inline-flex items-center justify-center rounded-lg px-3 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Vincular à mesa
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          Marcos Silva
                        </span>
                        <span className="text-xs text-gray-500">
                          Hoje • 20:00 · 4 pessoas
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Pendente de mesa
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs inline-flex items-center justify-center rounded-lg px-3 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Vincular à mesa
                      </button>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          Família Rocha
                        </span>
                        <span className="text-xs text-gray-500">
                          Hoje • 21:15 · 6 pessoas
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Pendente de mesa
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs inline-flex items-center justify-center rounded-lg px-3 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Vincular à mesa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}