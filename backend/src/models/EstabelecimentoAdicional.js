class EstabelecimentoAdicional {
  constructor({
    telefone_restaurante,
    especialidade,
    descricao_restaurante,
    meios_pagamento,
    tipos_servico
  }) {
    this.telefone_restaurante = telefone_restaurante;
    this.especialidade = especialidade;
    this.descricao_restaurante = descricao_restaurante;
    this.meios_pagamento = meios_pagamento;
    this.tipos_servico = tipos_servico;
  }
}

module.exports = EstabelecimentoAdicional;
