const pool = require('../config/db');
const Item = require('../models/Item');
const cloudinary = require('../config/cloudinary')

async function criarItem({ nome_item, descricao_item, preco_item, imagem, visivel, cardapio_sessao_id }) {
  const checkQuery = 'SELECT * FROM item_sessao WHERE nome_item = $1 AND cardapio_sessao_id = $2';
  const checkRes = await pool.query(checkQuery, [nome_item, cardapio_sessao_id]);
  if (checkRes.rows.length > 0) {
    throw new Error('Já existe um item com esse nome nesta sessão!');
  }

  let urlImagem = null;
  
  if (imagem && imagem.startsWith("data:image")) {
    const uploadRes = await cloudinary.uploader.upload(imagem, {
      folder: "itens_cardapio", // opcional: cria uma pasta no Cloudinary
    });
    urlImagem = uploadRes.secure_url;
  }  

  const novoItem = new Item({
    nome_item,
    descricao_item,
    preco_item,
    imagem: urlImagem,
    visivel,
    cardapio_sessao_id
  });

  const insertQuery = `
    INSERT INTO item_sessao (nome_item, descricao_item, preco_item, imagem, visivel, cardapio_sessao_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    novoItem.nome_item,
    novoItem.descricao_item,
    novoItem.preco_item,
    novoItem.imagem,
    novoItem.visivel,
    novoItem.cardapio_sessao_id
  ];

  const res = await pool.query(insertQuery, values);
  return new Item(res.rows[0]);
}


async function listarItemPorSessao(cardapio_sessao_id) {
  const query = `SELECT * FROM item_sessao WHERE cardapio_sessao_id = $1`;
  const res = await pool.query(query, [cardapio_sessao_id]);
  return res.rows.map(row => new Item(row));
}

module.exports = { criarItem, listarItemPorSessao }