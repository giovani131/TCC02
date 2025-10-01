const pool = require('../config/db');
const Sessao = require('../models/Sessao');

async function criarSessao({ nome_sessao, ordem, cardapio_id }) {
  
  const checkQuery = 'SELECT * FROM cardapio)sessao WHERE nome_sessao = $1 AND cardapio_id = $2';
  const checkRes = await pool.query(checkQuery, [nome_sessao, cardapio_id]);
  if (checkRes.rows.length > 0) {
    throw new Error('Já existe uma sessão com esse nome neste cardápio!');
  }

  const novoCardapio = new Sessao({
    nome_sessao,
    ordem,
    cardapio_id,
  });

  const insertQuery = `
    INSERT INTO cardapio_sessao (nome_sessao, ordem, cardapio_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [
    novoCardapio.nome_sessao,
    novoCardapio.ordem,
    novoCardapio.cardapio_id,
  ];

  const res = await pool.query(insertQuery, values);
  return new Sessao(res.rows[0]);
}

async function listarSessaoPorCardapio(cardapio_id) {
  const query = `SELECT * FROM cardapio_sessao WHERE cardapio_id = $1`;
  const res = await pool.query(query, [cardapio_id]);

  return res.rows.map(row => new Sessao(row));
}

module.exports = { criarSessao, listarSessaoPorCardapio }