const homeRestaurantesServico = require("../services/homeRestaurantesServico")

async function listar(req, res){
    try{
        const { tipo } = req.params;

        const restaurantes = await homeRestaurantesServico.listarRestauranteComFiltro(tipo)
        res.status(200).json(restaurantes)
    }catch(err){
        res.status(500).json({ message: "Erro ao listar restaurantes", error: err.message })
    }
}
module.exports = { listar }