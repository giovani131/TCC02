const pool = require('../config/db');
const Estabelecimento = require('../models/Estabelecimento');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function criarEstabelecimento({ nome_restaurante,nome_responsavel,cpf_responsavel,cnpj,telefone_responsavel,email_responsavel,senha }) {

  const checkQuery = `
    SELECT * FROM estabelecimentos 
    WHERE email_responsavel = $1 OR cpf_responsavel = $2
  `;
  const checkRes = await pool.query(checkQuery, [email_responsavel, cpf_responsavel]);

  if (checkRes.rows.length > 0) {
    const existing = checkRes.rows[0];
    if (existing.email_responsavel === email_responsavel) {
      throw new Error('Estabelecimento já cadastrado com esse Email!');
    }
    if (existing.cpf_responsavel === cpf_responsavel) {
      throw new Error('Estabelecimento já cadastrado com esse CPF!');
    }
  }


  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoEstabelecimento = new Estabelecimento({
    nome_restaurante,
    nome_responsavel,
    cpf_responsavel,
    cnpj,
    telefone_responsavel,
    email_responsavel,
    senha: senhaCriptografada
  });

  const insertQuery = `
    INSERT INTO estabelecimentos(
    nome_restaurante,
    nome_responsavel,
    cpf_responsavel,
    cnpj,
    telefone_responsavel,
    email_responsavel,
    senha
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [novoEstabelecimento.nome_restaurante,novoEstabelecimento.nome_responsavel, novoEstabelecimento.cpf_responsavel,
                novoEstabelecimento.cnpj, novoEstabelecimento.telefone_responsavel, novoEstabelecimento.email_responsavel, 
                novoEstabelecimento.senha];
  
  const res = await pool.query(insertQuery, values);

  return new Estabelecimento(res.rows[0]);
}

async function editarEstabelecimento(id, { nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, senha }) {
  
  let senhaCriptografada = senha;
  if (senha) {
    senhaCriptografada = await bcrypt.hash(senha, 10);
  }

  const updateQuery = `
    UPDATE estabelecimentos
    SET nome_restaurante = $1, nome_responsavel = $2, cpf_responsavel = $3, cnpj = $4 , telefone_responsavel = $5, email_responsavel = $6, senha = $7
    WHERE id_estabelecimento = $8
    RETURNING *;
  `;
  const values = [nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, senhaCriptografada, id];

  const res = await pool.query(updateQuery, values);

  if (res.rows.length === 0) {
    throw new Error('Estabelecimento não encontrado');
  }

  return new Estabelecimento(res.rows[0]);
}

async function deletarEstabelecimento(id) {
  const deleteQuery = `
    DELETE FROM estabelecimentos
    WHERE id_estabelecimento = $1
    RETURNING *;
  `;

  const res = await pool.query(deleteQuery, [id]);

  if (res.rows.length === 0) {
    throw new Error('Estabelecimento não encontrado');
  }

  return res.rows[0];
}



async function loginEstabelecimento(email, senha) {
  const res = await pool.query('SELECT * FROM estabelecimentos WHERE email_responsavel = $1', [email]);
  const estabelecimento = res.rows[0];
  if (!estabelecimento) throw new Error('Email ou senha inválidos');

  const senhaValida = await bcrypt.compare(senha, estabelecimento.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos');
  const token = jwt.sign({ id: estabelecimento.id_estabelecimento }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { estabelecimento, token };
}

async function getEstabelecimentoPorId(id) {
  const query = `
    SELECT nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel
    FROM estabelecimentos
    WHERE id_estabelecimento = $1
  `;
  const values = [id];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

module.exports = {criarEstabelecimento, editarEstabelecimento, deletarEstabelecimento, loginEstabelecimento, getEstabelecimentoPorId}