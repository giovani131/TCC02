class Estabelecimento {
    constructor({nome_restaurante,cpf_cnpj_responsavel,telefone_responsavel,email_responsavel,senha,endereco_rua,endereco_bairro,endereco_num}){
        this.nome_restaurante = nome_restaurante;
        this.cpf_cnpj_responsavel = cpf_cnpj_responsavel;
        this.telefone_responsavel = telefone_responsavel;
        this.email_responsavel = email_responsavel;
        this.senha = senha;
        this.endereco_rua = endereco_rua;
        this.endereco_bairro = endereco_bairro;
        this.endereco_num = endereco_num;
    }
}

module.exports = Estabelecimento;