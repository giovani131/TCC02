const pool = require('../config/db');
const Estabelecimento = require('../models/Estabelecimento');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function criarEstabelecimento({ nome_restaurante,cpf_cnpj_responsavel,telefone_responsavel,email_responsavel,senha,endereco_rua,endereco_bairro,endereco_num }) {

  const checkQuery = 'SELECT * FROM estabelecimentos WHERE cpf_cnpj_responsavel = $1';
  const checkRes = await pool.query(checkQuery, [cpf_cnpj_responsavel]);
  if (checkRes.rows.length > 0) {
    throw new Error('Estabelecimento já cadastrado com esse CPF/CNPJ!');
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoEstabelecimento = new Estabelecimento({
    nome_restaurante,
    cpf_cnpj_responsavel,
    telefone_responsavel,
    email_responsavel,
    senha: senhaCriptografada,
    endereco_rua,
    endereco_bairro,
    endereco_num
  });

  const insertQuery = `
    INSERT INTO estabelecimentos(
    nome_restaurante,
    cpf_cnpj_responsavel,
    telefone_responsavel,
    email_responsavel,
    senha,
    endereco_rua,
    endereco_bairro,
    endereco_num
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [novoEstabelecimento.nome_restaurante, novoEstabelecimento.cpf_cnpj_responsavel, 
                novoEstabelecimento.telefone_responsavel, novoEstabelecimento.email_responsavel, novoEstabelecimento.senha,
                novoEstabelecimento.endereco_rua,novoEstabelecimento.endereco_bairro,novoEstabelecimento.endereco_num];
  
  const res = await pool.query(insertQuery, values);

  return new Estabelecimento(res.rows[0]);
}

async function editarEstabelecimento(id, { dados }) {
  
  let senhaCriptografada = senha;
  if (senha) {
    senhaCriptografada = await bcrypt.hash(senha, 10);
  }

  const updateQuery = `
    UPDATE estabelecimentos
    SET dados = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [dados, id];

  const res = await pool.query(updateQuery, values);

  if (res.rows.length === 0) {
    throw new Error('Estabelecimento não encontrado');
  }

  return new Estabelecimento(res.rows[0]);
}

async function deletarEstabelecimento(id) {
  const deleteQuery = `
    DELETE FROM estabelecimentos
    WHERE id = $1
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
    SELECT id_estabelecimento, nome_restaurante, cpf_cnpj_responsavel, telefone_responsavel, email_responsavel, endereco_rua, endereco_bairro, endereco_num
    FROM estabelecimentos
    WHERE id_estabelecimento = $1
  `;
  const values = [id];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

module.exports = {criarEstabelecimento, editarEstabelecimento, deletarEstabelecimento, loginEstabelecimento, getEstabelecimentoPorId}