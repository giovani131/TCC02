class Area {
    constructor({id, nome_area, status, capacidade_mesa, estabelecimento_id, motivo, height, width}){
        this.id = id
        this.nome_area = nome_area
        this.status = status
        this.capacidade_mesa = capacidade_mesa
        this.estabelecimento_id = estabelecimento_id
        this.motivo = motivo
        this.width = width
        this.height = height
    }
}

class AreaDTO{
    constructor({ id, nome_area, status, capacidade_mesa, mesas_disponiveis, motivo, height, width }){
        this.id = id
        this.nome_area = nome_area
        this.status = status
        this.capacidade_mesa = capacidade_mesa
        this.mesas_disponiveis = mesas_disponiveis
        this.motivo = motivo
        this.width = width
        this.height = height
    }
}

module.exports = { Area, AreaDTO };