class EstabelecimentoEndereco {
  constructor({
    endereco_cep,
    endereco_estado,
    endereco_cidade,
    endereco_bairro,
    endereco_rua,
    endereco_num
  }) {
    this.endereco_cep = endereco_cep;
    this.endereco_estado = endereco_estado;
    this.endereco_cidade = endereco_cidade;
    this.endereco_bairro = endereco_bairro;
    this.endereco_rua = endereco_rua;
    this.endereco_num = endereco_num;
  }
}

module.exports = EstabelecimentoEndereco;
