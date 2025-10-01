class Sessao {
    constructor({nome_sessao,ordem,cardapio_id}){
        this.nome_sessao = nome_sessao;
        this.ordem = ordem;
        this.cardapio_id = cardapio_id;
    }
}

module.exports = Sessao;