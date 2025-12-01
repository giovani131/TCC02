import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { DetalhesReserva } from "./mesas/DetalhesReserva";
import { ModalReservaDetails } from "./mesas/ModalReservaDetails";
import { listReservasPendents } from "@/services/payment.services";

export interface ReservaPendentes{
    id: number
    quantidade_pessoas: number
    nome_responsavel: string
    telefone_responsavel: string
    status: number
    criado_em: string
    tipo: number
    observacao: string
}


export function ReservasPendentes() {
    const [openModalReserva, setOpenModalReserva] = useState(false)
    const [reservas, setReservas] = useState<ReservaPendentes[]>([])
    useEffect(() => {
        async function list() {
            const response = await listReservasPendents(1, 1)
            console.log(response)
            setReservas(response)
        }
        list()
    }, [])
  return (
    <div className="w-full p-4 rounded-xl bg-white shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Reservas Pendentes</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Cliente</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Telefone</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Observacao</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((reserva, index) => (
              <tr
                key={reserva.id}
                className={`border-b cursor-pointer hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                // onClick={() => abrirModal(reserva)}
              >
                <td className="py-3 px-4 text-gray-800 font-medium">{reserva.nome_responsavel}</td>

                <td className="py-3 px-4 text-gray-700">{reserva.telefone_responsavel}</td>

                <td className="py-3 px-4 text-gray-700">{reserva.status}</td>

                <td className="py-3 px-4 text-gray-700">{reserva.observacao ?? "-"}</td>
              </tr>
            ))}

            {reservas.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 px-4 text-center text-gray-500 text-sm italic"
                >
                  Nenhuma reserva pendente encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {
        openModalReserva && <ModalReservaDetails close={() => setOpenModalReserva(false)} />
      }
    </div>
  );
}
