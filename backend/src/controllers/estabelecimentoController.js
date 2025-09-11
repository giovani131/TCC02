const estabelecimentoServices = require("../services/estabelecimentoServices")

async function cadastrarEstabelecimento(req, res) {
  try {
    const { nome_restaurante, cpf_cnpj_responsavel, telefone_responsavel, 
        email_responsavel, senha, endereco_rua, endereco_bairro, endereco_num } = req.body;

    if (!nome_restaurante || !cpf_cnpj_responsavel || !telefone_responsavel 
        || !email_responsavel || !senha || !endereco_rua || !endereco_bairro || !endereco_num) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const estabelecimento = await estabelecimentoServices.criarEstabelecimento({ nome_restaurante, cpf_cnpj_responsavel, telefone_responsavel, 
        email_responsavel, senha, endereco_rua, endereco_bairro, endereco_num });

    res.status(201).json({
      message: "Estabelecimento cadastrado com sucesso!",
      user: {
        id_estabelecimento: estabelecimento.id_estabelecimento,
        nome_resposavel: estabelecimento.nome_restaurante,
        cpf_cnpj_responsavel: estabelecimento.cpf_cnpj_responsavel,
        telefone_responsavel: estabelecimento.telefone_responsavel,
        email_responsavel: estabelecimento.email_responsavel,
        endereco_rua: estabelecimento.endereco_rua,
        endereco_bairro: estabelecimento.endereco_bairro,
        endereco_num: estabelecimento.endereco_num
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
        nome_resposavel: estabelecimento.nome_restaurante,
        telefone_responsavel: estabelecimento.telefone_responsavel,
        email_responsavel: estabelecimento.email_responsavel,
        endereco_rua: estabelecimento.endereco_rua,
        endereco_bairro: estabelecimento.endereco_bairro,
        endereco_num: estabelecimento.endereco_num },
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

module.exports = {cadastrarEstabelecimento, loginEstabelecimento, getEstabelecimentoLogado}