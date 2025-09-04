const pool = require('../config/db');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function criarUsuario({ nome, telefone, email, senha }) {

  const checkQuery = 'SELECT * FROM usuarios WHERE email = $1';
  const checkRes = await pool.query(checkQuery, [email]);
  if (checkRes.rows.length > 0) {
    throw new Error('Usuário já cadastrado com esse email!');
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = new Usuario({
    nome,
    telefone,
    email,
    senha: senhaCriptografada,
  });

  const insertQuery = `
    INSERT INTO usuarios (nome, telefone, email, senha)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [novoUsuario.nome, novoUsuario.telefone, novoUsuario.email, novoUsuario.senha];
  
  const res = await pool.query(insertQuery, values);

  return new Usuario(res.rows[0]);
}

async function editarUsuario(id, { nome, telefone, email, senha }) {
  let senhaCriptografada = senha;
  if (senha) {
    senhaCriptografada = await bcrypt.hash(senha, 10);
  }

  const updateQuery = `
    UPDATE usuarios
    SET nome = $1, telefone = $2, email = $3, senha = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [nome, telefone, email, senhaCriptografada, id];

  const res = await pool.query(updateQuery, values);

  if (res.rows.length === 0) {
    throw new Error('Usuário não encontrado');
  }

  return new Usuario(res.rows[0]);
}

async function deletarUsuario(id) {
  const deleteQuery = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING *;
  `;

  const res = await pool.query(deleteQuery, [id]);

  if (res.rows.length === 0) {
    throw new Error('Usuário não encontrado');
  }

  return res.rows[0];
}

async function loginUsuario(email, senha) {
  const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const usuario = res.rows[0];
  if (!usuario) throw new Error('Email ou senha inválidos');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos');
  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { usuario, token };
}

module.exports = { criarUsuario, editarUsuario , deletarUsuario, loginUsuario};

