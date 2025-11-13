const pool = require('../config/db')
const { EstabelecimentoHome } = require("../models/EstabelecimentoHome")

async function listarRestauranteComFiltro(tipo){
    const pegarEstabelecimentoQuery = 'select e.id_estabelecimento, e.nome_restaurante, e.logo from estabelecimentos e where e.dados_completos = true and e.especialidade = $1 LIMIT 4';
    const estabelecimentoResposta = await pool.query(pegarEstabelecimentoQuery, [tipo])

    return estabelecimentoResposta.rows.map(row => 
    new EstabelecimentoHome(row.id_estabelecimento, row.nome_restaurante, row.logo)
    );
}

module.exports = { listarRestauranteComFiltro }