const sessaoServices = require("../services/sessaoServices");

async function criarSessao(req, res) {
  try {
    const { nome_sessao, ordem, cardapio_id } = req.body;

    if (!nome_sessao || !ordem) {
      return res.status(400).json({ message: "Preencha os campos obrigatórios: nome e ordem" });
    }

    const sessao = await sessaoServices.criarSessao({
      nome_sessao,
      ordem,
      cardapio_id,
    });

    res.status(201).json({
      message: "Sessão criado com sucesso!",
      sessao,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listarSessaoPorCardapio(req, res) {
  try {
    const  { cardapio_id }  = req.params; 

    const sessoes = await sessaoServices.listarSessaoPorCardapio(Number(cardapio_id));

    res.status(200).json(sessoes);
  } catch (err) {
    console.error("Erro ao listar sessões:", err);
    res.status(500).json({ message: "Erro ao listar as sessões", error: err.message });
  }
}

async function editarSessao(req, res) {
  try { 
    const { nome_sessao, ordem, id } = req.body;

    if (nome_sessao == null || ordem == null ||id == null) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

    const sessaoAtualizado = await sessaoServices.editarSessao( nome_sessao, ordem, id);

    res.status(200).json({
      message: 'Sessão atualizada com sucesso!',
      item: {
        id: sessaoAtualizado.id,
        nome_sessao: sessaoAtualizado.nome_sessao,
        ordem: sessaoAtualizado.ordem
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


module.exports = { criarSessao , listarSessaoPorCardapio, editarSessao };
