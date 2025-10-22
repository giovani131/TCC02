const cardapioServices = require("../services/cardapioServices");

async function criarCardapio(req, res) {
  try {
    const { nome_cardapio, descricao_cardapio, status } = req.body;
    const estabelecimento_id = req.user.id;

    if (!nome_cardapio || !descricao_cardapio || !status) {
      return res.status(400).json({ message: "Preencha os campos obrigatórios: nome, status e estabelecimento_id" });
    }

    const cardapio = await cardapioServices.criarCardapio({
      nome_cardapio,
      descricao_cardapio,
      status,
      estabelecimento_id,
    });

    res.status(201).json({
      message: "Cardápio criado com sucesso!",
      cardapio,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listarCardapiosPorEstabelecimento(req, res) {
  try {
    const  estabelecimento_id  = req.user.id;

    const cardapios = await cardapioServices.listarCardapiosPorEstabelecimento(estabelecimento_id);

    res.status(200).json(cardapios);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar cardápios", error: err.message });
  }
}

async function editarCardapio(req, res) {
  try { 
    const { nome_cardapio, descricao_cardapio, status, id } = req.body;

    if (nome_cardapio == null ||descricao_cardapio == null ||status == null ||id == null) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

    const cardapioAtualizado = await cardapioServices.editarCardapio( nome_cardapio, descricao_cardapio, status, id);

    res.status(200).json({
      message: 'Cardapio atualizado com sucesso!',
      item: {
        id: cardapioAtualizado.id,
        nome_cardapio: cardapioAtualizado.nome_cardapio,
        descricao_cardapio: cardapioAtualizado.descricao_cardapio,
        status: cardapioAtualizado.status
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deletarCardapio(req, res) {
  try {
    const {id} = req.body;

    const cardapioDeletado = await cardapioServices.deletarCardapio(id);

    res.status(200).json({
      message: 'Cardapio deletado com sucesso!',
      user: {
        id: cardapioDeletado.id,
        nome_cardapio: cardapioDeletado.nome_cardapio,
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



module.exports = { criarCardapio, listarCardapiosPorEstabelecimento, editarCardapio, deletarCardapio };
