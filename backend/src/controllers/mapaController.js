const mapaServices = require("../services/mapaServices")

async function getDadosRestaurantes(req, res) {
  try {

    const localizacoes = await mapaServices.getDadosRestaurantes();

    if (!localizacoes) {
      return res.status(404).json({ message: "Localizações não encontradas" });
    }

    res.json(localizacoes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar localizações de restaurantes" });
  }
}



module.exports = {getDadosRestaurantes}