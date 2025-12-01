
import { ModalEscructure } from "@/core/components/ModalEstructure";
import { X } from "lucide-react";

interface ModalReservaDetailsProps {
  close: () => void;
}

export function ModalReservaDetails({ close }: ModalReservaDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <ModalEscructure>
        <div className="flex flex-row justify-between p-2">
          <span className="text-black text-[20px] font-bold">
            Detalhes da reserva
          </span>
          <X className="cursor-pointer" onClick={close} />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white border-white/30">
          {/* RESPONSÁVEL */}
          <div className="col-span-2">
            <span className="text-xl font-bold">Responsável pela Reserva</span>
            <div className="mt-1 flex flex-col text-sm">
              <span>
                <strong>Nome:</strong> Matheus Miura
              </span>
              <span>
                <strong>Telefone:</strong> (19) 97600-6104
              </span>
              <span>
                <strong>E-mail:</strong> matheusmiura98@gmail.com
              </span>
              <span>
                <strong>Documento:</strong> 123.456.789-10
              </span>
              <span>
                <strong>Observações:</strong> Cliente recorrente / VIP
              </span>
            </div>
          </div>

          <div className="col-span-2">
            <span className="text-xl font-bold">Informações da Reserva</span>
            <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
              <span>
                <strong>Data:</strong> 12/12/2025
              </span>
              <span>
                <strong>Horário Solicitado:</strong> 19:00
              </span>
              <span>
                <strong>Quantidade de Pessoas:</strong> 4 pessoas
              </span>
              <span>
                <strong>Área:</strong> Salão Principal
              </span>
              <span>
                <strong>Mesa:</strong> Mesa 12
              </span>
              <span>
                <strong>Código da Reserva:</strong> RVS-20251212-0012
              </span>
              <span>
                <strong>Status da Reserva:</strong> Confirmada
              </span>
            </div>
          </div>

          <div className="col-span-2">
            <span className="text-xl font-bold">Pagamento</span>
            <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
              <span>
                <strong>Status do Pagamento:</strong> Pagamento Aprovado
              </span>
              <span>
                <strong>Forma de Pagamento:</strong> PIX
              </span>
              <span>
                <strong>Valor da Reserva:</strong> R$ 150,00
              </span>
              <span>
                <strong>Transação:</strong> TXN-987654321
              </span>
              <span>
                <strong>Data do Pagamento:</strong> 29/11/2025 - 16:04
              </span>
              <span>
                <strong>Comprovante:</strong> Disponível
              </span>
            </div>
          </div>
        </div>
      </ModalEscructure>
    </div>
  );
}
