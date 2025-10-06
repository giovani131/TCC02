const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const estabelecimentoController = require("../controllers/estabelecimentoController")
const cardapioController = require("../controllers/cardapioController")
const sessaoController = require("../controllers/sessaoController")
const itemController = require("../controllers/itemController")
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

//Cardapio
router.post("/cadastrarCardapio", autenticarToken, cardapioController.criarCardapio)
router.get("/listarCardapiosPorId", autenticarToken, cardapioController.listarCardapiosPorEstabelecimento)

//Sessao
router.post("/cadastrarSessao", sessaoController.criarSessao)
router.get("/listarSessoesPorCardapio/:cardapio_id", autenticarToken,sessaoController.listarSessaoPorCardapio)

//Item
router.post("/cadastrarItem", itemController.criarItem)
router.get("/listarItensPorSessao/:cardapio_sessao_id", itemController.listarItemPorSessao)

module.exports = router;
