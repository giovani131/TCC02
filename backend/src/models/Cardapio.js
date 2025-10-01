class Cardapio {
    constructor({id,nome_cardapio,descricao_cardapio,status,estabelecimento_id}){
        this.id = id;
        this.nome_cardapio = nome_cardapio;
        this.descricao_cardapio = descricao_cardapio;
        this.status = status;
        this.estabelecimento_id = estabelecimento_id;
    }
}

module.exports = Cardapio;