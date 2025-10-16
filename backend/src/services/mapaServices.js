const pool = require('../config/db');

async function getDadosRestaurantes() {
    const query = `
        SELECT    
        nome_restaurante,
        logo,
        telefone_restaurante,
        especialidade,
        descricao_restaurante,
        endereco_cep,
        endereco_estado,
        endereco_cidade,
        endereco_bairro,
        endereco_rua,
        endereco_num
        FROM estabelecimentos
        WHERE status = 1 AND dados_completos = true;   
        `;

    const result = await pool.query(query);
    console.log(result)
    if (result.rows.length === 0) return [];

    const restaurantesComCoords = [];

    for (const r of result.rows) {
        const enderecoCompleto = `${r.endereco_rua} ${r.endereco_num}, ${r.endereco_bairro}, ${r.endereco_cidade}, ${r.endereco_estado}, ${r.endereco_cep}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoCompleto)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        restaurantesComCoords.push({
            nome_restaurante: r.nome_restaurante,
            logo: r.logo,
            telefone_restaurante: r.telefone_restaurante,
            especialidade: r.especialidade,
            descricao_restaurante: r.descricao_restaurante,
            lat,
            lng,
        });
        } else {
        console.warn(`Endereço não encontrado: ${enderecoCompleto}`);
        }
    }

    return restaurantesComCoords;
}

module.exports = { getDadosRestaurantes };
