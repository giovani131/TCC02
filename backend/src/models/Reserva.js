class Reserva{
    constructor({id, codigo_reserva, status, entrada_inicial, usuario_id, horario_reserva, quantidade_pessoas, tempo_limite, estabelecimento_id}){
        this.id = id
        this.codigo_reserva = codigo_reserva
        this.status = status
        this.entrada_inicial = entrada_inicial
        this.usuario_id = usuario_id
        this.horario_reserva = horario_reserva
        this.quantidade_pessoas = quantidade_pessoas
        this.tempo_limite = tempo_limite
        this.estabelecimento_id = estabelecimento_id
    }
}

module.exports = Reserva