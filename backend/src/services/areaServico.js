const pool = require('../config/db');
const { Area, AreaDTO } = require('../models/Area');

async function criarArea({nome_area, status, capacidade_mesa, estabelecimento_id, motivo, width, height})
{
    const pegarEstabelecimentoQuery = 'SELECT * FROM estabelecimentos WHERE id_estabelecimento = $1';
    const estabelecimentoResposta = await pool.query(pegarEstabelecimentoQuery, [estabelecimento_id])
    if(estabelecimentoResposta.rows.length <= 0)
        throw new Error("Estabelecimento não encontrado.")

    const novaArea = new Area({
        nome_area,
        status,
        capacidade_mesa,
        estabelecimento_id,
        motivo,
        height,
        width
    })

    const inserirAreaQuery = `INSERT INTO area (nome_area, status, capacidade_mesa, estabelecimento_id, motivo, width, height) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `

    const values = [
        novaArea.nome_area,
        novaArea.status,
        novaArea.capacidade_mesa,
        novaArea.estabelecimento_id,
        novaArea.motivo,
        novaArea.width,
        novaArea.height
    ]

    const resposta = await pool.query(inserirAreaQuery, values)
    return new Area(resposta.rows[0])
}

async function editarArea(id, nome_area, status, capacidade_mesa, width, height){
    console.log(id)
    const pegarAreaQuery = 'SELECT * FROM Area WHERE id = $1'
    const pegarAreaResposta = await pool.query(pegarAreaQuery, [id])
    console.log(pegarAreaResposta.rows)
    if(pegarAreaResposta.rows.length <= 0)
        throw new Error("Área não encontrada")

    const editarAreaQuery =`
        UPDATE area 
        SET nome_area = $1,
        status = $2,
        capacidade_mesa = $3,
        width = $4,
        height = $5
        WHERE id = $6
        RETURNING *`
    const values = [nome_area, status, capacidade_mesa, width, height, id];   

    const resposta = await pool.query(editarAreaQuery, values)
    return new Area(resposta.rows[0])
}

async function listarArea(estabelecimento_id)
{
    const query = `SELECT
                    a.id,
                    a.nome_area,
                    a.status,
                    a.capacidade_mesa,
                    a.motivo,
                    a.width,
                    a.height,
                    COUNT(m.id) AS mesas_disponiveis
                    FROM area a
                    LEFT JOIN mesa m
                    ON m.area_id = a.id AND m.status = 1
                    WHERE a.estabelecimento_id = $1
                    GROUP BY a.id, a.nome_area, a.status, a.capacidade_mesa
                    ORDER BY a.nome_area;`

    const resposta = await pool.query(query, [estabelecimento_id])
    return resposta.rows.map(row => new AreaDTO(row));
}

async function procurarPorId(id, estabelecimento_id)
{
    const query = `SELECT
                    a.id,
                    a.nome_area,
                    a.status,
                    a.capacidade_mesa,
                    a.motivo,
                    a.width,
                    a.height,
                    COUNT(m.id) AS mesas_disponiveis
                    FROM area a
                    LEFT JOIN mesa m
                    ON m.area_id = a.id AND m.status = 1
                    WHERE a.estabelecimento_id = $1 AND a.id = $2
                    GROUP BY a.id, a.nome_area, a.status, a.capacidade_mesa
                    ORDER BY a.nome_area;`
    const resposta = await pool.query(query, [estabelecimento_id, id])
    console.log(resposta.rows[0])
    return new AreaDTO(resposta.rows[0])
}

module.exports = { criarArea, editarArea, listarArea, procurarPorId }