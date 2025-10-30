const pool = require('../config/db');
const Estabelecimento = require('../models/Estabelecimento');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary')


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
    senha: senhaCriptografada,
    dados_completos: false,
    status: 3
  });

  const insertQuery = `
    INSERT INTO estabelecimentos(
    nome_restaurante,
    nome_responsavel,
    cpf_responsavel,
    cnpj,
    telefone_responsavel,
    email_responsavel,
    senha,
    dados_completos,
    status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [novoEstabelecimento.nome_restaurante,novoEstabelecimento.nome_responsavel, novoEstabelecimento.cpf_responsavel,
                novoEstabelecimento.cnpj, novoEstabelecimento.telefone_responsavel, novoEstabelecimento.email_responsavel, 
                novoEstabelecimento.senha, novoEstabelecimento.dados_completos, novoEstabelecimento.status];
  
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
  if (estabelecimento.status !== 1) throw new Error('Estabelecimento ainda não foi aprovado pelos nossos administradores.')

  const senhaValida = await bcrypt.compare(senha, estabelecimento.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos');
  const token = jwt.sign({ id: estabelecimento.id_estabelecimento }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { estabelecimento, token };
}

async function getEstabelecimentoLogadoDadosIniciais(id) {
  const query = `
    SELECT nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, dados_completos, status
    FROM estabelecimentos
    WHERE id_estabelecimento = $1
  `;
  const values = [id];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

async function completarDados( endereco_cep, endereco_estado, endereco_cidade, endereco_bairro, endereco_rua, endereco_num, logo, telefone_restaurante,
      especialidade, descricao_restaurante, meios_pagamento, tipos_servico, id) {

  let urlLogo = null;
    
  if (logo && logo.startsWith("data:image")) {
    const uploadRes = await cloudinary.uploader.upload(logo, {
      folder: "logos_restaurante",
    });
    urlLogo = uploadRes.secure_url;
  }  
  
  const insertQuery = `
      UPDATE estabelecimentos
      SET
        endereco_cep = $1, 
        endereco_estado = $2, 
        endereco_cidade = $3, 
        endereco_bairro = $4, 
        endereco_rua = $5, 
        endereco_num = $6, 
        logo = $7, 
        telefone_restaurante = $8,
        especialidade = $9, 
        descricao_restaurante = $10, 
        meios_pagamento = $11, 
        tipos_servico = $12,
        dados_completos = $13
      WHERE id_estabelecimento = $14 
      RETURNING *;
  `;
  const values = [endereco_cep, endereco_estado, endereco_cidade, endereco_bairro, endereco_rua, endereco_num, urlLogo, telefone_restaurante,
      especialidade, descricao_restaurante, meios_pagamento, tipos_servico, true, id];
  
  const res = await pool.query(insertQuery, values);

  return res.rows[0];
}

async function alterarStatus(status, id) {
  
let novoStatus;

  if (status === 1){
    novoStatus = 2
  }else{
    novoStatus = 1
  }

  const query = `
    UPDATE estabelecimentos
    SET status = $1
    WHERE id_estabelecimento = $2
    RETURNING *
  `;
  const values = [novoStatus, id];

  const res = await pool.query(query, values);

  return res.rows[0];
}

async function getEstabelecimentoDadosCompletos(id) {
  const query = `
    SELECT nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, dados_completos, status, 
    endereco_cep, endereco_estado, endereco_cidade, endereco_bairro, endereco_rua, endereco_num, logo, telefone_restaurante,
    especialidade, descricao_restaurante, meios_pagamento, tipos_servico
    FROM estabelecimentos
    WHERE id_estabelecimento = $1
  `;
  const values = [id];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return result.rows[0];
}



module.exports = {criarEstabelecimento, editarEstabelecimento, deletarEstabelecimento, 
  loginEstabelecimento, getEstabelecimentoLogadoDadosIniciais, completarDados, alterarStatus, 
  getEstabelecimentoDadosCompletos
}