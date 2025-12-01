import { useRouter } from "next/router";
import React from "react";

export default function MesaJaLanding() {
  const router = useRouter()
    return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-lg font-bold">
              MJ
            </div>
            <div>
              <span className="block text-lg font-semibold tracking-tight">
                MesaJá
              </span>
              <span className="block text-xs text-slate-400">
                Reservas inteligentes para restaurantes
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#como-funciona" className="hover:text-emerald-300">
              Como funciona
            </a>
            <a href="#beneficios" className="hover:text-emerald-300">
              Benefícios
            </a>
            <a href="#funcionalidades" className="hover:text-emerald-300">
              Funcionalidades
            </a>
            <a href="#planos" className="hover:text-emerald-300">
              Planos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="hidden rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:border-emerald-300/60 hover:text-emerald-200 md:inline-flex">
              Entrar
            </button>
            <button className="rounded-lg bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:brightness-110">
              Quero testar
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="border-b border-white/5 bg-[radial-gradient(circle_at_top,_#22c55e22,_transparent_60%),radial-gradient(circle_at_bottom,_#0ea5e922,_transparent_60%)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-20">
            {/* Texto */}
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Nova geração de reservas para restaurantes
              </span>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Organize mesas, horários e reservas{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  em poucos cliques
                </span>
              </h1>

              <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                O <strong>MesaJá</strong> é um sistema completo para gestão de
                reservas: cadastre áreas, mesas, horários e acompanhe reservas
                em tempo real, evitando overbooking e filas desnecessárias.
              </p>

              <div className="flex flex-col gap-3 text-sm sm:flex-row">
                <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-sky-500 px-5 py-2.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:brightness-110">
                  Agendar uma demonstração
                </button>
                <button className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-medium text-slate-100 hover:border-emerald-300/70 hover:text-emerald-200">
                  Ver como funciona
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-xs text-slate-300 sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Controle de áreas, mesas, dias e horários</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>Reservas online com aprovação do estabelecimento</span>
                </div>
              </div>
            </div>

            {/* “Screenshot” / Card do sistema */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-sky-500/10 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-emerald-500/20">
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-xs text-slate-300">
                      Painel de Reservas – MesaJá
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-4 p-4">
                    {/* Sidebar fake */}
                    <aside className="col-span-4 space-y-3 border-r border-white/5 pr-3">
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-xs font-semibold text-slate-200">
                          Áreas do salão
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-slate-300">
                          <li>• Salão principal</li>
                          <li>• Varanda externa</li>
                          <li>• Mezanino</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-xs font-semibold text-slate-200">
                          Status das mesas
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-300">
                            Disponíveis: 12
                          </span>
                          <span className="rounded-full bg-amber-500/20 px-2 py-1 text-amber-200">
                            Reservadas: 5
                          </span>
                          <span className="rounded-full bg-rose-500/20 px-2 py-1 text-rose-200">
                            Ocupadas: 3
                          </span>
                        </div>
                      </div>
                    </aside>

                    {/* Grade de mesas fake */}
                    <div className="col-span-8 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-100">
                          Reservas de hoje
                        </h3>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-300">
                          +18 reservas confirmadas
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          "M01 · 2 pessoas",
                          "M02 · 4 pessoas",
                          "M05 · 6 pessoas",
                          "M07 · 2 pessoas",
                          "M11 · 4 pessoas",
                          "M14 · 8 pessoas",
                        ].map((mesa, i) => (
                          <div
                            key={i}
                            className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-2"
                          >
                            <span className="font-semibold text-slate-100">
                              {mesa}
                            </span>
                            <span className="text-[11px] text-slate-300">
                              19:00 – 20:30
                            </span>
                            <span className="inline-flex w-fit rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                              Reservada
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Controle visual de mesas, horários e status.</span>
                        <button className="rounded-lg bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20">
                          Ver painel completo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section
          id="como-funciona"
          className="border-b border-white/5 bg-slate-950"
        >
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-50">
                Como o MesaJá funciona
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Em poucos passos você configura seu restaurante e começa a
                receber reservas organizadas, sem perder o controle do salão.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-xs font-semibold text-emerald-300">
                  1
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Cadastre áreas e mesas
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Organize seu salão por áreas (salão, varanda, mezanino) e
                  cadastre cada mesa com capacidade e status.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-xs font-semibold text-sky-300">
                  2
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Defina dias e horários
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Configure disponibilidade de cada mesa por dia e horário,
                  evitando conflitos e overbooking automaticamente.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-xs font-semibold text-violet-300">
                  3
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Receba e gerencie reservas
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Seus clientes fazem o pedido de reserva e você aprova, nega ou
                  ajusta, tudo pelo painel do MesaJá.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section
          id="beneficios"
          className="border-b border-white/5 bg-slate-950/95"
        >
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-50">
                Benefícios para o seu restaurante
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Mais organização, menos no-show e uma experiência melhor para o
                cliente final.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
                <h3 className="font-semibold text-slate-50">
                  Redução de filas e espera
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Organize os horários de pico e permita que o cliente já chegue
                  com mesa reservada.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
                <h3 className="font-semibold text-slate-50">
                  Visão clara do salão
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Visualize em tempo real quais mesas estão livres, reservadas ou
                  ocupadas.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
                <h3 className="font-semibold text-slate-50">
                  Menos erros manuais
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Esqueça caderninho e planilha: o MesaJá controla conflitos de
                  horário automaticamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section
          id="funcionalidades"
          className="border-b border-white/5 bg-slate-950"
        >
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-50">
                Funcionalidades do MesaJá
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Tudo o que você precisa para ter um fluxo de reservas profissional
                e organizado.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Cadastro de áreas e mesas com capacidade e status
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Configuração de dias e horários disponíveis por mesa
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Controle de solicitações de reservas (aceitar, negar, remarcar)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Histório de reservas e comentários por parte do estabelecimento
                </li>
              </ul>

              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Integração com fluxo de pagamento por reserva (ex.: sinal/pix)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Painel para acompanhar reservas do dia, semana e mês
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Campos para observações do cliente e comentários internos
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Arquitetura pronta para multi-estabelecimento
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-slate-50">
                Planos simples para começar
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Comece pequeno e evolua conforme o movimento do seu restaurante.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm font-semibold text-slate-100">
                  Essencial
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Ideal para pequenos restaurantes que estão começando com
                  reservas online.
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-slate-50">
                    R$ 0
                  </span>
                  <span className="text-xs text-slate-400"> / teste</span>
                </div>
                <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
                  <li>• Até X mesas cadastradas</li>
                  <li>• Controle básico de reservas</li>
                  <li>• Suporte por e-mail</li>
                </ul>
                <button className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 hover:border-emerald-300/60 hover:text-emerald-200">
                  Começar teste
                </button>
              </div>

              <div className="flex flex-col rounded-2xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/15 to-slate-900 p-6 shadow-lg shadow-emerald-500/30">
                <span className="mb-2 inline-flex w-fit rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                  Mais escolhido
                </span>
                <h3 className="text-sm font-semibold text-slate-100">
                  Profissional
                </h3>
                <p className="mt-2 text-xs text-slate-200">
                  Para casas com grande giro de clientes e necessidade de
                  controle fino.
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-slate-50">
                    R$ XX
                  </span>
                  <span className="text-xs text-slate-300"> / mês</span>
                </div>
                <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-100">
                  <li>• Mesas e áreas ilimitadas</li>
                  <li>• Controle avançado de horários</li>
                  <li>• Painéis e relatórios de reservas</li>
                  <li>• Suporte prioritário</li>
                </ul>
                <button className="mt-5 rounded-lg bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:brightness-110">
                  Falar com nosso time
                </button>
              </div>

              <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm font-semibold text-slate-100">
                  Sob medida
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Para redes, franquias ou operações com múltiplas unidades e
                  integrações.
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-slate-50">
                    Sob consulta
                  </span>
                </div>
                <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
                  <li>• Multi-estabelecimento</li>
                  <li>• Integrações personalizadas</li>
                  <li>• Onboarding dedicado</li>
                </ul>
                <button className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 hover:border-emerald-300/60 hover:text-emerald-200">
                  Agendar conversa
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MesaJá. Todos os direitos reservados.</span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-emerald-300">
              Termos de uso
            </a>
            <a href="#" className="hover:text-emerald-300">
              Política de privacidade
            </a>
            <a href="#" className="hover:text-emerald-300">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
