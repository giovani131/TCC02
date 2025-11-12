const areaServico = require("../services/areaServico")

async function criar(req, res)
{
    try{
        const { nome_area, status, capacidade_mesa } = req.body;
        const estabelecimento_id = req.user.id;

        if(!nome_area || !status || !capacidade_mesa){
            return res.status(400).json({message: "Todos os campos obrigatorios"});
        }

        const area = await areaServico.criarArea({
            nome_area, status, capacidade_mesa, estabelecimento_id
        });

        res.status(201).json({
            message: "Área criada com sucesso!",
            area: area
        })
    }catch(err) {
        res.status(400).json({message: err.message})
    }
}

async function listar(req, res){
    try{
        const estabelecimento_id = req.user.id;

        const areas = await areaServico.listarArea(estabelecimento_id);

        res.status(200).json(areas)
    }
    catch(err){
        res.status(500).json({message: "Erro ao listar area", error: err.message})
    }
}

async function atualizar(req, res)
{
    try{
        const { id, nome_area, status, capacidade_mesa } = req.body
        const response = await areaServico.editarArea(id, nome_area, status, capacidade_mesa)

        res.status(200).json({
            message: 'Area atualizado com sucesso',
            item: {
                id: response.id,
                nome_area: response.nome_area,
                status: response.status,
                capacidade_mesa: response.capacidade_mesa
            }
        });
    }catch(err) {
        res.status(400).json({message: err.message})
    }
}

async function pegarPorId(req, res){
    try{
        const { id } = req.params;
        if(!id)
            return res.status(400).json({ message: "ID é obrigatorio" })

        const estabelecimento_id = req.user.id
        const response = await areaServico.procurarPorId(id, estabelecimento_id)
        res.status(200).json(response)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

module.exports = { criar, atualizar, listar, pegarPorId }