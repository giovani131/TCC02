const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const estabelecimentoController = require("../controllers/estabelecimentoController")
const cardapioController = require("../controllers/cardapioController")
const sessaoController = require("../controllers/sessaoController")
const itemController = require("../controllers/itemController")
const mapaController = require("../controllers/mapaController")
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
router.get("/estabelecimentoDados", autenticarToken, estabelecimentoController.getEstabelecimentoLogado)
router.post("/completarDados", autenticarToken, estabelecimentoController.completarDados)
router.patch("/alterarStatus", autenticarToken, estabelecimentoController.alterarStatus)

//Cardapio
router.post("/cadastrarCardapio", autenticarToken, cardapioController.criarCardapio)
router.get("/listarCardapiosPorId", autenticarToken, cardapioController.listarCardapiosPorEstabelecimento)
router.patch("/editarCardapio", cardapioController.editarCardapio)

//Sessao
router.post("/cadastrarSessao", sessaoController.criarSessao)
router.get("/listarSessoesPorCardapio/:cardapio_id", autenticarToken,sessaoController.listarSessaoPorCardapio)
router.patch("/editarSessao", sessaoController.editarSessao)

//Item
router.post("/cadastrarItem", itemController.criarItem)
router.get("/listarItensPorSessao/:cardapio_sessao_id", itemController.listarItemPorSessao)
router.patch("/editarItem", itemController.editarItem)
router.delete("/deletarItem", itemController.deletarItem)

//Mapa
router.get("/locRestaurantes", mapaController.getDadosRestaurantes)

module.exports = router;
