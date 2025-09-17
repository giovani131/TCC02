const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const estabelecimentoController = require("../controllers/estabelecimentoController")
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

module.exports = router;
