export default function MesasAlt() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-purple-800">Área • Detalhes & Mesas</h1>
            <p className="text-xs text-gray-500">ID: ...</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Voltar</button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">
              Salvar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Edição da Área */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Card: Informações */}
          <section className="bg-white rounded-2xl border shadow-sm p-4">
            <h2 className="text-sm font-semibold text-purple-700 mb-3">Informações da Área</h2>
            <div className="space-y-3">
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Nome</label>
                <input className="rounded-lg border px-3 py-2" placeholder="Ex.: Varanda Gourmet" />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Tipo</label>
                <select className="rounded-lg border px-3 py-2">
                  <option>Interna</option>
                  <option>Externa</option>
                  <option>VIP</option>
                </select>
              </div>

              <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                <span className="text-sm">Status</span>
                <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                  Liberada
                </span>
              </div>
            </div>
          </section>

          {/* Card: Capacidade */}
          <section className="bg-white rounded-2xl border shadow-sm p-4">
            <h3 className="text-sm font-semibold text-purple-700 mb-3">Capacidade</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <p className="text-[10px] opacity-80">Mesas</p>
                <p className="text-xl font-bold">--</p>
              </div>
              <div className="p-3 rounded-lg border">
                <p className="text-[10px] text-gray-500">Cadeiras</p>
                <p className="text-xl font-bold text-purple-700">--</p>
              </div>
              <div className="p-3 rounded-lg border">
                <p className="text-[10px] text-gray-500">Livres</p>
                <p className="text-xl font-bold text-emerald-600">--</p>
              </div>
            </div>
          </section>

          {/* Card: Horários (estático) */}
          <section className="bg-white rounded-2xl border shadow-sm p-4">
            <h3 className="text-sm font-semibold text-purple-700 mb-3">Horários</h3>
            <div className="text-xs border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 px-3 py-2 font-medium">
                <span>Dia</span><span>Tipo</span><span>Abertura</span><span>Fechamento</span>
              </div>
              <div className="grid grid-cols-4 px-3 py-2 border-t">
                <span>Segunda</span><span>Normal</span><span>18:00</span><span>23:00</span>
              </div>
              <div className="grid grid-cols-4 px-3 py-2 border-t">
                <span>Terça</span><span>Feriado</span><span>—</span><span>—</span>
              </div>
            </div>
          </section>
        </aside>

        {/* Conteúdo */}
        <section className="lg:col-span-3 space-y-6">
          {/* Abas + Filtros */}
          <div className="bg-white rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-1">
                <button className="px-3 py-2 text-sm rounded-lg bg-purple-100 text-purple-800">
                  Grid
                </button>
                <button className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
                  Lista
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                  Todas
                </button>
                <button className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                  Disponíveis
                </button>
                <button className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                  Ocupadas
                </button>
              </div>
            </div>

            {/* Grid de Mesas (aba ativa) */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card Mesa */}
              <div className="rounded-2xl border p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Mesa 01</p>
                    <h4 className="text-base font-semibold text-purple-800">Janela</h4>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                    Ativa
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Cadeiras</p>
                    <p className="text-lg font-bold">4</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Ocupadas / Livres</p>
                    <p className="text-lg font-bold text-emerald-600">2 / 2</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                    -1 cadeira
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                    +1 cadeira
                  </button>
                  <button className="ml-auto px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 text-sm">
                    Desativar
                  </button>
                </div>
              </div>

              {/* Duplique o card acima para mais mesas */}
              <div className="rounded-2xl border p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Mesa 02</p>
                    <h4 className="text-base font-semibold text-purple-800">Centro</h4>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-rose-100 text-rose-700">
                    Inativa
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Cadeiras</p>
                    <p className="text-lg font-bold">2</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Ocupadas / Livres</p>
                    <p className="text-lg font-bold text-rose-600">2 / 0</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                    -1 cadeira
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                    +1 cadeira
                  </button>
                  <button className="ml-auto px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 text-sm">
                    Ativar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista (exemplo visual — deixe oculto se quiser) */}
            <div className="hidden p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-2">Mesa</th>
                      <th className="px-3 py-2">Local</th>
                      <th className="px-3 py-2">Cadeiras</th>
                      <th className="px-3 py-2">Ocupadas</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-3 py-2">Mesa 01</td>
                      <td className="px-3 py-2">Janela</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">
                        <span className="text-[10px] px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                          Ativa
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 text-sm">
                          Editar
                        </button>
                      </td>
                    </tr>
                    {/* Duplique as linhas conforme necessário */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
