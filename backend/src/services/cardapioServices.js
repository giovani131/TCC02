const pool = require('../config/db');
const Cardapio = require('../models/Cardapio');

async function criarCardapio({ nome_cardapio, descricao_cardapio, status, estabelecimento_id }) {
  
  const checkQuery = 'SELECT * FROM cardapio WHERE nome_cardapio = $1 AND estabelecimento_id = $2';
  const checkRes = await pool.query(checkQuery, [nome_cardapio, estabelecimento_id]);
  if (checkRes.rows.length > 0) {
    throw new Error('Já existe um cardápio com esse nome neste estabelecimento!');
  }

  const novoCardapio = new Cardapio({
    nome_cardapio,
    descricao_cardapio,
    status,
    estabelecimento_id,
  });

  const insertQuery = `
    INSERT INTO cardapio (nome_cardapio, descricao_cardapio, status, estabelecimento_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    novoCardapio.nome_cardapio,
    novoCardapio.descricao_cardapio,
    novoCardapio.status,
    novoCardapio.estabelecimento_id,
  ];

  const res = await pool.query(insertQuery, values);
  return new Cardapio(res.rows[0]);
}

async function listarCardapiosPorEstabelecimento(estabelecimento_id) {
  const query = `SELECT * FROM cardapio WHERE estabelecimento_id = $1`;
  const res = await pool.query(query, [estabelecimento_id]);

  return res.rows.map(row => new Cardapio(row));
}

async function editarCardapio( nome_cardapio, descricao_cardapio, status, id) {

  const updateQuery = `
    UPDATE cardapio
    SET nome_cardapio = $1, descricao_cardapio = $2, status = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [nome_cardapio, descricao_cardapio, status, id];

  const res = await pool.query(updateQuery, values);

  if (res.rows.length === 0) {
    throw new Error('Cardapio não encontrado');
  }

  return res.rows[0];
}

async function deletarCardapio(id) {

  const deleteQuery = `
    DELETE FROM cardapio
    WHERE id = $1
    RETURNING *;
  `;

  const res = await pool.query(deleteQuery, [Number(id)]);
  if (res.rows.length === 0) {
    throw new Error('Cardapio não encontrado');
  }
  return res.rows[0];
}

module.exports = { criarCardapio,listarCardapiosPorEstabelecimento, editarCardapio, deletarCardapio};
