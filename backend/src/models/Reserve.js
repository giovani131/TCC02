class Reserva{
    constructor({ id, codigo_reserva, tempo_limite, entrada_inicial, status, reserva_request_id, reserva_process_id, estabelecimento_id, usuario_id })
    {
        this.id = id
        this.codigo_reserva = codigo_reserva
        this.tempo_limite = tempo_limite
        this.entrada_inicial = entrada_inicial
        this.status = status
        this.reserva_request_id = reserva_request_id
        this.reserva_process_id = reserva_process_id
        this.usuario_id = usuario_id
        this.estabelecimento_id = estabelecimento_id
    }
}

class ReservaRequest{
    constructor({ id, quantidade_pessoas, data_reserva, nome_responsavel, telefone_responsavel, horario_reserva, estabelecimento_id, usuario_id }){
        this.id = id,
        this.quantidade_pessoas = quantidade_pessoas
        this.data_reserva = data_reserva
        this.nome_responsavel = nome_responsavel
        this.telefone_responsavel = telefone_responsavel
        this.horario_reserva = horario_reserva
        this.estabelecimento_id = estabelecimento_id
        this.usuario_id = usuario_id
    }
}

class ReservaProcess{
    constructor({ id, transaction_id, transaction_references, paid_amout, pixqrcodeimage, pixqrcodecopy, status, date_request, estabelecimento_id, usuario_id }){
        this.id = id
        this.transaction_id = transaction_id
        this.transaction_references = transaction_references
        this.paid_amout = paid_amout
        this.pixqrcodeimage = pixqrcodeimage
        this.pixqrcodecopy = pixqrcodecopy
        this.status = status
        this.date_request = date_request
        this.estabelecimento_id = estabelecimento_id
        this.usuario_id = usuario_id
    }
}

class ProcessDTO{
    constructor({ reservaProcessId, reservaId, reservaRequestId, transaction_id, transaction_references, pixqrcodeimage, pixqrcodecopy, status, nome_responsavel, quantidade_pessoas, data_reserva, hora_inicio, nome_restaurante, endereco_rua, endereco_num  }){
        this.reservaProcessId = reservaProcessId,
        this.reservaId = reservaId,
        this.reservaRequestId = reservaRequestId,
        this.transaction_id = transaction_id,
        this.transaction_references = transaction_references,
        this.pixqrcodeimage = pixqrcodeimage,
        this.pixqrcodecopy = pixqrcodecopy,
        this.status = status,
        this.nome_responsavel = nome_responsavel,
        this.quantidade_pessoas = quantidade_pessoas,
        this.hora_inicio = hora_inicio,
        this.data_reserva = data_reserva,
        this.nome_restaurante = nome_restaurante,
        this.endereco_rua = endereco_rua,
        this.endereco_num = endereco_num
    }
}

class ReservaRequestDTO{
    constructor({ id, quantidade_pessoas, nome_responsavel, telefone_responsavel, status, criado_em, observacao, tipo })
    {
        this.id = id
        this.quantidade_pessoas = quantidade_pessoas
        this.nome_responsavel = nome_responsavel
        this.telefone_responsavel = telefone_responsavel
        this.status = status
        this.criado_em = criado_em
        this.observacao = observacao
        this.tipo = tipo
    }
}
module.exports = { Reserva, ReservaProcess, ReservaRequest, ProcessDTO, ReservaRequestDTO }



