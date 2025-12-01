export interface IReserveRequest{
    horario_reserva: string
    data_reserva: string
    quantidade_pessoas: number
    estabelecimento_id: string
    nome_responsavel: string
    telefone_responsavel: string
}


export interface ReservaPendente {
  id: string;
  nome: string;
  data: string;      
  horario: string;     
  pessoas: number;
  mesa?: string;
  statusPagamento: PaymentStatus;
}

export interface IReservaMesaRequest{
    mesa_id: number
    data: string
    hora_inicio: string
    reserva_request_id: number
    comentario: string
    observacao: string
    tipo: number
}

type PaymentStatus = "paid" | "unpaid";