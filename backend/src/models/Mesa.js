class Mesa{
    constructor({id, codigo_mesa, status, capacidade_minima, capacidade_maxima, area_id}){
        this.id = id
        this.codigo_mesa = codigo_mesa
        this.status = status
        this.capacidade_minima = capacidade_minima
        this.capacidade_maxima = capacidade_maxima
        this.area_id = area_id
    }
}

module.exports = Mesa