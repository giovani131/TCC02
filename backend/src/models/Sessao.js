class Sessao {
    constructor({id,nome_sessao,ordem,cardapio_id}){
        this.id = id;
        this.nome_sessao = nome_sessao;
        this.ordem = ordem;
        this.cardapio_id = cardapio_id;
    }
}

module.exports = Sessao;