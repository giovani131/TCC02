class Estabelecimento {
    constructor({nome_restaurante,nome_responsavel,cpf_responsavel,cnpj,telefone_responsavel,email_responsavel,senha,dados_completos}){
        this.nome_restaurante = nome_restaurante;
        this.nome_responsavel = nome_responsavel;
        this.cpf_responsavel = cpf_responsavel;
        this.cnpj = cnpj;
        this.telefone_responsavel = telefone_responsavel;
        this.email_responsavel = email_responsavel;
        this.senha = senha;
        this.dados_completos = dados_completos;
    }
}

module.exports = Estabelecimento;