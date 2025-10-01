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

module.exports = { criarCardapio, listarCardapiosPorEstabelecimento };
