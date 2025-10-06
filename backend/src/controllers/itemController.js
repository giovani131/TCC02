const itemServices = require("../services/itemServices")
async function criarItem(req, res) {
  try {
    const { nome_item,descricao_item,preco_item,imagem,visivel,cardapio_sessao_id } = req.body;
    
    if (nome_item == null ||descricao_item == null ||preco_item == null ||imagem == null ||visivel == null ||cardapio_sessao_id == null) {
        return res.status(400).json({ message: "Preencha os campos obrigatórios.1" });
    }

    const item = await itemServices.criarItem({
        nome_item,
        descricao_item,
        preco_item,
        imagem,
        visivel,
        cardapio_sessao_id
    });

    res.status(201).json({
      message: "Item criado com sucesso!",
      item,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listarItemPorSessao(req, res) {
  try {
    const  { cardapio_sessao_id }  = req.params; 
    const itens = await itemServices.listarItemPorSessao(Number(cardapio_sessao_id));
    console.log(itens)
    res.status(200).json(itens);
  } catch (err) {
    console.error("Erro ao listar itens:", err);
    res.status(500).json({ message: "Erro ao listar os itens", error: err.message });
  }
}


module.exports = { criarItem, listarItemPorSessao };
