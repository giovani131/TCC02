class Area {
    constructor({id, nome_area, status, capacidade_mesa, estabelecimento_id, motivo}){
        this.id = id
        this.nome_area = nome_area
        this.status = status
        this.capacidade_mesa = capacidade_mesa
        this.estabelecimento_id = estabelecimento_id
        this.motivo = motivo
    }
}

class AreaDTO{
    constructor({ id, nome_area, status, capacidade_mesa, mesas_disponiveis, motivo }){
        this.id = id
        this.nome_area = nome_area
        this.status = status
        this.capacidade_mesa = capacidade_mesa
        this.mesas_disponiveis = mesas_disponiveis
        this.motivo = motivo
    }
}

module.exports = { Area, AreaDTO };