const pool = require('../config/db')
const { Day } = require("../models/Day")

async function criarDia(date, estabelecimento_id){
    if(date < new Date())
        throw new Error("Dia selecionado não pode ser registrado, pois já passou desta data.")
    const query = `INSERT INTO Day(day, estabelecimento_id) values($1, $2) returning *`
    const values = [date, estabelecimento_id]

    const response = await pool.query(query, values)

    return response.rows[0]
}

async function vincularDiaMesa(date_id, mesa_id, estabelecimento_id){
    const verificarMesa = `SELECT * FROM Mesa m WHERE m.id = $1`
    const verificarMesaResponse = await pool.query(verificarMesa, [mesa_id])
    if(verificarMesaResponse.rows.length <= 0)
        throw new Error("Mesa não encontrada")

    const verificarDia = `SELECT * FROM Day d where d.id = $1`
    const verificarDiaResponse = await pool.query(verificarDia, [date_id])
    if(verificarDiaResponse.rows.length <= 0)
        throw new Error("Dia não encontrado.")

    const verificarMesaDia = `SELECT * FROM MesaDay md where md.mesa_id = $1 and md.day_id = $2 and estabelecimento_id = $3`
    const verificarMesaDiaResponse = await pool.query(verificarMesaDia, [mesa_id, date_id, estabelecimento_id])
    if(verificarMesaDiaResponse.rows.length <= 0)
        throw new Error("Mesa já cadastrado.")

    const inserirDiaMesa = `INSERT INTO (mesa_id, day_id, estabelecimento_id) VALUES($1, $2, $3) RETURNING *`
    const insertResponse = await pool.query(inserirDiaMesa, [mesa_id, date_id, estabelecimento_id])
    if(insertResponse.rows.length <= 0)
        throw new Error("Erro ao inserir.")

    return insertResponse.rows[0]
}

async function listarDia(estabelecimento_id)
{
    const query = `SELECT * FROM Day d where d.estabelecimento_id = $1`
    const response = await pool.query(query, [estabelecimento_id])

    return response.rows.map((item) => new Day(item))
}

module.exports = { criarDia, listarDia, vincularDiaMesa }