const pool = require('../config/db')

async function avaliar({usuario_id, estabelecimento_id, nota, comentario}){
    const pegarEstabelecimentoQuery = 'SELECT * FROM estabelecimentos WHERE id_estabelecimento = $1';
    const estabelecimentoResposta = await pool.query(pegarEstabelecimentoQuery, [estabelecimento_id])
    if(estabelecimentoResposta.rows.length <= 0)
        throw new Error("Estabelecimento não encontrado.")

    if(nota < 0 || nota > 5)
        throw new Error("Nota tem que ser entre 0 a 5")

    const query = `
        INSERT INTO Avaliacao
        (usuario_id, estabelecimento_id, nota, comentario)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `

    const values = [
        usuario_id,
        estabelecimento_id,
        nota,
        comentario
    ]

    const resposta = await pool.query(query, values)
    return 
}