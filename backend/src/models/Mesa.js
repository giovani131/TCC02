class Mesa{
    constructor({id, codigo_mesa, status, capacidade_minima, capacidade_maxima, area_id, pos_x, pos_y}){
        this.id = id
        this.codigo_mesa = codigo_mesa
        this.status = status
        this.capacidade_minima = capacidade_minima
        this.capacidade_maxima = capacidade_maxima
        this.area_id = area_id
        this.pos_x = pos_x,
        this.pos_y = pos_y
    }
}

class MesaDTO{
    constructor({ id, codigo_mesa, status, capacidade_maxima, pos_x, pos_y }){
        this.id = id,
        this.codigo_mesa = codigo_mesa,
        this.status = status,
        this.capacidade_maxima = capacidade_maxima
        this.pos_x = pos_x,
        this.pos_y = pos_y
    }
}

module.exports = { Mesa, MesaDTO }