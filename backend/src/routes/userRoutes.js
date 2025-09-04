const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const autenticarToken = require("../middleware/autenticarToken")

router.post("/cadastrarUsuario", usuarioController.cadastrarUsuario);
router.post("/loginUsuario", usuarioController.loginUsuario)
router.patch("/editarUsuario", autenticarToken, usuarioController.editarUsuario);
router.delete("/deletarUsuario", usuarioController.deletarUsuario)

module.exports = router;
