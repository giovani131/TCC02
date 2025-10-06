class Item {
    constructor({id,nome_item,descricao_item,preco_item,imagem,visivel,cardapio_sessao_id}){
        this.id = id;
        this.nome_item = nome_item;
        this.descricao_item = descricao_item;
        this.preco_item = preco_item;
        this.imagem = imagem;
        this.visivel = visivel;
        this.cardapio_sessao_id = cardapio_sessao_id;
    }
}

module.exports = Item;