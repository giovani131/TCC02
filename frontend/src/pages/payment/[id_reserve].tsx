import { IPaymentResponse } from "@/models/Payment";
import { getProcess } from "@/services/payment.services";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentReserve() {
    const router = useRouter()
  const { id_reserve } = router.query;// pega o id da URL
  console.log(id_reserve)
  const [process, setProcess] = useState<IPaymentResponse>()
  const getProcessReserve = async() => {
      const response = await getProcess("7402bc0b-4868-4705-9c52-95984556f44b")
      setProcess(response);
  }

  useEffect(() => {
    getProcessReserve()
  }, [])

  function formatarDataISO(iso: string | undefined) {
    if(!iso)
      return "00-00-0000"
    const data = new Date(iso);
    return data.toLocaleDateString("pt-BR");
  }

  function formatarHora(time: string | undefined) {
    if(!time)
      return "00:00"
    return time.substring(0, 5); // Pega só HH:MM
  }
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8 border border-purple-200/40">
        
        <header className="flex flex-col md:flex-row md:justify-between gap-6">
          
          <div className="space-y-2 max-w-md">
            <span className="text-xs uppercase tracking-wide text-purple-600 font-medium">
              Pagamento de reserva
            </span>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Confirme o pagamento da sua entrada
            </h1>

            <p className="text-sm text-gray-600">
              Faça o pagamento da entrada solicitada pelo restaurante para prosseguir com sua reserva.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 w-full md:w-72">
            <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold text-white">
              M
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-gray-900 text-sm">{process?.nome_restaurante}</p>
              <p className="text-xs text-gray-600">
                {process?.endereco_rua}, {process?.endereco_num}
              </p>
              <p className="text-xs text-purple-700 font-medium">
                Horário: {formatarHora(process?.hora_inicio)} • Data: {formatarDataISO(process?.data_reserva)}
              </p>
            </div>
          </div>

        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8">
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Efetue o pagamento pelo QR Code abaixo
            </h2>

            <p className="text-sm text-gray-600">
              Escaneie o código com o aplicativo do seu banco ou copie o código Pix abaixo.
            </p>

            <div className="flex items-center justify-center mt-4">
              <div className="aspect-square w-56 rounded-2xl border-2 border-purple-500/40 bg-purple-100 flex items-center justify-center text-xs text-purple-700 font-medium">
                <img src={process?.pixqrcodeimage} alt="" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-5 space-y-3">
            
            <span className="text-sm font-medium text-purple-700">        
                  
            </span>

            <textarea
              readOnly
              className="w-full min-h-[110px] bg-white border border-purple-300 rounded-xl px-3 py-2 text-xs text-gray-700 resize-none outline-none focus:ring-2 focus:ring-purple-400"
              value={process?.pixqrcodecopy}
           />

            <button
              type="button"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transition px-4 py-2.5 text-sm font-medium text-white shadow-md"
              onClick={() => {
                navigator.clipboard.writeText("");
              }}
            >
              Copiar código
            </button>

            <p className="text-[11px] text-gray-500 mt-1">
              Após o pagamento, sua reserva será confirmada automaticamente.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
