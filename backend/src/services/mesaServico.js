const pool = require('../config/db')
const { MesaDTO } = require('../models/Mesa')
const { Mesa } = require('../models/Mesa')

async function criarMesa({ codigo_mesa, status, capacidade_minima, capacidade_maxima, area_id, pos_x, pos_y }){
    const checkQuery = 'SELECT * FROM Area m WHERE m.id = $1'
    const checkQueryResponse = await pool.query(checkQuery, [area_id])
    if(checkQueryResponse.rows.length <= 0)
        throw new Error("Área não encontrada")

    if(capacidade_minima > capacidade_maxima)
        throw new Error("Capacidade minima tem que ser maior que a maxima")

    const checkQueryPos = 'select * from mesa m where m.area_id = $1 and m.pos_x = $2 and m.pos_y = $3'
    const checkQueryPosResponse = await pool.query(checkQueryPos, [area_id, pos_x, pos_y])
    if(checkQueryPosResponse.rows.length > 0)
        throw new Error("Já existe uma mesa cadastrada nessa posição. Escolha outra coordenada.")

    const novaMesa = new Mesa({
        codigo_mesa,
        status,
        capacidade_minima,
        capacidade_maxima,
        area_id,
        pos_x,
        pos_y
    })
    const query = `INSERT INTO Mesa
                    (codigo_mesa, status, capacidade_minima, capacidade_maxima, area_id, pos_x, pos_y)
                    VALUES($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *`
    const values = [
        novaMesa.codigo_mesa,
        novaMesa.status,
        novaMesa.capacidade_minima,
        novaMesa.capacidade_maxima,
        novaMesa.area_id,
        novaMesa.pos_x,
        novaMesa.pos_y
    ]
    const resposta = await pool.query(query, values)
    return new Mesa(resposta.rows[0])
}

async function atualizarMesa({ id_mesa, codigo_mesa, status, capacidade_minima, capacidade_maxima }){
    const mesaQuery = `SELECT * FROM Mesa m WHERE m.id = $1`
    const mesaResponse = await pool.query(mesaQuery, [id_mesa])
    if(mesaResponse.rows.length <= 0)
        throw new Error("Mesa não encontrada")

    const updateQuery = ` 
        UPDATE mesa
        SET codigo_mesa = $1,
        status = $2,
        capacidade_minima = $3,
        capacidade_maxima = $4,
        WHERE id = $4
        RETURNING *`
    
    const updateResponse = await pool.query(updateQuery, [codigo_mesa, status, capacidade_minima, capacidade_maxima, id_mesa])
    if(updateResponse.rows[0] <= 0)
        throw new Error("Erro ao atualizar")

    return new Mesa(updateResponse.rows[0])
}

async function listarMesa(id_area, tipo){
    const query = `SELECT * FROM Mesa m where m.area_id = $1 and m.tipo = $2`
    const response = await pool.query(query, [id_area, tipo])

    return response.rows.map((item) => new MesaDTO(item))
}

async function pegarPorId(id_mesa){
    const query = `SELECT * FROM Mesa m where m.id = $1`
    const response = await pool.query(query, [id_mesa])

    return new MesaDTO(response[0])
}

module.exports = { criarMesa, atualizarMesa, listarMesa, pegarPorId }