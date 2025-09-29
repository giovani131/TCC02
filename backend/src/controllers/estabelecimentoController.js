const estabelecimentoServices = require("../services/estabelecimentoServices")

async function cadastrarEstabelecimento(req, res) {
  try {
    const { nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, 
        email_responsavel, senha} = req.body;

    if (!nome_restaurante || !nome_responsavel || !cpf_responsavel || !cnpj || !telefone_responsavel 
        || !email_responsavel || !senha ) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const estabelecimento = await estabelecimentoServices.criarEstabelecimento({ nome_restaurante, nome_responsavel, cpf_responsavel,
    cnpj, telefone_responsavel, email_responsavel, senha});

    res.status(201).json({
      message: "Estabelecimento cadastrado com sucesso!",
      user: {
        id_estabelecimento: estabelecimento.id_estabelecimento,
        nome_restaurante: estabelecimento.nome_restaurante,
        nome_responsavel: estabelecimento.nome_responsavel,
        cpf_responsavel: estabelecimento.cpf_cnpj_responsavel,
        cnpj: estabelecimento.cnpj,
        telefone_responsavel: estabelecimento.telefone_responsavel,
        email_responsavel: estabelecimento.email_responsavel,
        senha: estabelecimento.senha
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function editarEstabelecimento(req, res) {
  try {
    const id = req.user.id; 
    const { nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, senha } = req.body;

    if (!nome_restaurante || !nome_responsavel || !cpf_responsavel || !cnpj || !telefone_responsavel || !email_responsavel || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

    const estabelecimentoAtualizado = await estabelecimentoServices.editarEstabelecimento(id, { nome_restaurante, nome_responsavel, cpf_responsavel, cnpj, telefone_responsavel, email_responsavel, senha});

    res.status(200).json({
      message: 'Estabelecimento atualizado com sucesso!',
      user: {
        nome_restaurante: estabelecimentoAtualizado.nome_restaurante,
        nome_responsavel: estabelecimentoAtualizado.nome_responsavel,
        cpf_responsavel: estabelecimentoAtualizado.cpf_responsavel,
        cnpj: estabelecimentoAtualizado.cnpj,
        telefone_responsavel: estabelecimentoAtualizado.telefone_responsavel,
        email_responsavel: estabelecimentoAtualizado.email_responsavel
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deletarEstabelecimento(req, res) {
  try {
    const id = req.user.id;

    const estabelecimentoDeletado = await estabelecimentoServices.deletarEstabelecimento(id);

    res.status(200).json({
      message: 'Estabelecimento deletado com sucesso!',
      user: {
        id_estabelecimento: estabelecimentoDeletado.id_estabelecimento,
        nome_restaurante: estabelecimentoDeletado.nome_restaurante,
        nome_responsavel: estabelecimentoDeletado.nome_responsavel,
        email_responsavel: estabelecimentoDeletado.email_responsavel
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function loginEstabelecimento(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'Preencha todos os campos!' });

    const { estabelecimento, token } = await estabelecimentoServices.loginEstabelecimento(email, senha);
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      user: { id_estabelecimento: estabelecimento.id_estabelecimento,
        nome_restaurante: estabelecimento.nome_restaurante,
        nome_responsavel: estabelecimento.nome_responsavel,
        cpf_responsavel: estabelecimento.cpf_responsavel,
        cnpj: estabelecimento.cnpj,
        telefone_responsavel: estabelecimento.telefone_responsavel,
        email_responsavel: estabelecimento.email_responsavel,
        },
      token
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getEstabelecimentoLogado(req, res) {
  try {
    const userId = req.user.id; // do middleware
    const estabelecimento = await estabelecimentoServices.getEstabelecimentoPorId(userId);

    if (!estabelecimento) {
      return res.status(404).json({ message: "Estabelecimento não encontrado" });
    }

    res.json(estabelecimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar estabelecimento" });
  }
}

module.exports = {cadastrarEstabelecimento, editarEstabelecimento, deletarEstabelecimento, loginEstabelecimento, getEstabelecimentoLogado}