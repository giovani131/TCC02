const mesaServico = require("../services/mesaServico")

async function criar(req, res)
{
    try{
        const { codigo_mesa, status,capacidade_maxima, pos_x, pos_y, area_id } = req.body

        const mesa = await mesaServico.criarMesa({codigo_mesa, status, capacidade_minima: 1, capacidade_maxima, area_id, pos_x, pos_y})

        res.status(201).json({
            message: "Mesa criada com sucesso",
            mesa: mesa
        })
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

async function listar(req, res)
{
    try{
        const { id } = req.params;
        if(!id)
            return res.status(400).json({ message: "ID é obrigatorio" })

        const mesas = await mesaServico.listarMesa(id)
        res.status(200).json(mesas)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = { criar, listar }