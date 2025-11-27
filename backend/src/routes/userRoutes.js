const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const estabelecimentoController = require("../controllers/estabelecimentoController")
const cardapioController = require("../controllers/cardapioController")
const sessaoController = require("../controllers/sessaoController")
const itemController = require("../controllers/itemController")
const mapaController = require("../controllers/mapaController")
const areaController = require("../controllers/areaController")
const homeRestaurantesController = require("../controllers/homeRestaurantesController")
const mesaController = require("../controllers/mesaController")
const autenticarToken = require("../middleware/autenticarToken")

//Usuario
router.post("/cadastrarUsuario", usuarioController.cadastrarUsuario);
router.post("/loginUsuario", usuarioController.loginUsuario)
router.patch("/editarUsuario", autenticarToken, usuarioController.editarUsuario);
router.delete("/deletarUsuario", autenticarToken, usuarioController.deletarUsuario)
router.get("/usuarioDados", autenticarToken, usuarioController.getUsuarioLogado)

//Estabelecimento
router.post("/cadastrarEstabelecimento", estabelecimentoController.cadastrarEstabelecimento);
router.post("/loginEstabelecimento", estabelecimentoController.loginEstabelecimento)
router.patch("/editarEstabelecimento", autenticarToken, estabelecimentoController.editarEstabelecimento)
router.delete("/deletarEstabelecimento", autenticarToken, estabelecimentoController.deletarEstabelecimento)
router.get("/estabelecimentoLogadoDadosIniciais", autenticarToken, estabelecimentoController.getEstabelecimentoLogadoDadosIniciais)
router.post("/completarDados", autenticarToken, estabelecimentoController.completarDados)
router.patch("/alterarStatus", autenticarToken, estabelecimentoController.alterarStatus)
router.get("/estabelecimentoLogadoDadosCompletos", autenticarToken, estabelecimentoController.getEstabelecimentoDadosCompletos)
router.patch("/editarEstabelecimentoEndereco", autenticarToken, estabelecimentoController.editarEstabelecimentoEndereco)
router.patch("/editarEstabelecimentoAdicional", autenticarToken, estabelecimentoController.editarEstabelecimentoAdicional)

//Cardapio
router.post("/cadastrarCardapio", autenticarToken, cardapioController.criarCardapio)
router.get("/listarCardapiosPorIdEstabelecimento", autenticarToken, cardapioController.listarCardapiosPorEstabelecimento)
router.get("/listarCardapiosPorIdCliente/:estabelecimento_id", cardapioController.listarCardapiosPorEstabelecimentoCliente)
router.patch("/editarCardapio", cardapioController.editarCardapio)
router.delete("/deletarCardapio", cardapioController.deletarCardapio)

//Sessao
router.post("/cadastrarSessao", sessaoController.criarSessao)
router.get("/listarSessoesPorCardapio/:cardapio_id", autenticarToken, sessaoController.listarSessaoPorCardapio)
router.patch("/editarSessao", sessaoController.editarSessao)
router.delete("/deletarSessao", sessaoController.deletarSessao)

//Item
router.post("/cadastrarItem", itemController.criarItem)
router.get("/listarItensPorSessao/:cardapio_sessao_id", itemController.listarItemPorSessao)
router.patch("/editarItem", itemController.editarItem)
router.delete("/deletarItem", itemController.deletarItem)

//Mapa
router.get("/locRestaurantes", mapaController.getDadosRestaurantes)

//Area
router.get("/area/listar", autenticarToken, areaController.listar)
router.get("/area/:id", autenticarToken, areaController.pegarPorId)
router.post("/area/cadastrar", autenticarToken, areaController.criar)
router.patch("/area/atualizar", autenticarToken, areaController.atualizar)

//Home
router.get("/home/listar/:tipo", autenticarToken, homeRestaurantesController.listar)

//Mesa
router.post("/mesa/cadastrar", autenticarToken, mesaController.criar)
router.get("/mesa/listar/:id", autenticarToken, mesaController.listar)

module.exports = router;
