class SolicitacaoReserva{
    constructor({id, reserva_id, usuario_id, horario_solicitacao, status, respondido_por, resposta, respondido_em, estabelecimento_id}){
        this.id = id
        this.reserva_id = reserva_id
        this.usuario_id = usuario_id
        this.horario_solicitacao = horario_solicitacao
        this.status = status
        this.respondido_por = respondido_por
        this.respondido_em = respondido_em
        this.resposta = resposta
        this.estabelecimento_id = estabelecimento_id
    }
}

module.exports = SolicitacaoReserva