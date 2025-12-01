const dayService = require("../services/dayServico");

async function criarDia(req, res){
    try{
        const { date } = req.body
        const estabelecimento_id = req.user.id

        const criarDia = await dayService.criarDia(date, estabelecimento_id)
        res.status(201).json({
            message: "Dia criado com sucesso.",
            criarDia
        })
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
}

async function listarDia(req, res){
    try{
        const estabelecimento_id = req.user.id
        const lista = await dayService.listarDia(estabelecimento_id)

        res.status(200).json(lista)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

module.exports = { criarDia, listarDia }