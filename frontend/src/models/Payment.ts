export interface IPaymentResponse {
  transaction_id: string;
  pixqrcodeimage: string;         // Base64 image
  pixqrcodecopy: string;          // Copia e cola
  status: number;                 // Status do pagamento

  nome_responsavel: string;
  quantidade_pessoas: number;

  data_reserva: string;
  hora_inicio: string;          // "19:00:00"
  data_reserva_solicitado: string;             // "2025-04-28T03:00:00.000Z"

  nome_restaurante: string;
  endereco_rua: string;
  endereco_num: string;
}

export interface IReservePayload {
  estabelecimento_id: string | number | undefined;
  quantidade_pessoas: number;
  email_responsavel: string
  hoje: boolean;
  amanha: boolean;
  tipo_string: string;
  tipo: number
  data_solicitado_string: string
  data_solicitado: string           // formato: YYYY-MM-DD
  nome_responsavel: string;
  telefone_responsavel: string;
  observacao: string      // formato: HH:mm
}
