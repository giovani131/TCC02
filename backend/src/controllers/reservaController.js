const reservaServico = require("../services/reserveService")
async function gerarProcesso(req, res){
    try{
        console.log(req.body)
        const { estabelecimento_id, quantidade_pessoas, nome_responsavel, telefone_responsavel, tipo, observacao, email_responsavel } = req.body
        const usuario_id = req.user.id

        const process = await reservaServico.gerarProcesso(estabelecimento_id, usuario_id, quantidade_pessoas, nome_responsavel, telefone_responsavel, observacao, null, tipo, email_responsavel)

        res.status(201).json({
            message: "Processo de reserva gerado com sucesso",
            processo: process
        })
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}
//NAO MAPEADA NAS ROUTES
async function reserva_mesa(req, res)
{
    try{
        const usuario_id = req.user.id
        const { mesa_id, data, hora_inicio, hora_fim, reserva_request_id, comentario, status_request, status_reserva, observacao, tipo } = req.body

        const process = await reservaServico.reserva_mesa(mesa_id, data, hora_inicio, hora_fim, reserva_request_id, usuario_id, comentario, status_request, status_reserva, observacao, tipo)
        res.status(201).json({
            message: "Processo gerado com sucesso.",
            process: process
        })
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
}


async function fakePayment(req, res)
{
    try{
        const { processId } = req.body

        const payment = await reservaServico.fakePayment(processId)
        res.status(200).json({
            message: "Pagamento realizado com sucesso.",
            payment: payment
        })
    }catch(err)
    {
        res.status(400).json({ message: err.message })
    }
}
async function getProcess(req, res){
    try{
        const { id } = req.params
        const process = await reservaServico.getProcess(id)
        res.status(200).json(process)
    }catch(err)
    {
        res.status(400).json({ message: err.message })
    }
}

async function listReservas(req, res)
{
    try{
        const id = req.user.id
        const { status, tipo } = req.params
        console.log(id)
        const reservas = await reservaServico.listReservas(id, status, tipo)

        res.status(200).json(reservas)
    }catch(err)
    {
        res.status(400).json({ message: err.message })
    }
}

async function getAllReseveByMesa(req, res)
{
    try{
        const id = req.user.id
        const { mesaId } = req.params
        const reservas = await reservaServico.getAllReserveByMesaId(mesaId)

        res.status(200).json(reservas)
    }catch(err)
    {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { gerarProcesso, getProcess, reserva_mesa, fakePayment, listReservas, getAllReseveByMesa }