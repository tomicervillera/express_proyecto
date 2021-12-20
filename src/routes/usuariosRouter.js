const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController");

router.post("/", UsuariosController.getUsuarioByEmailPass);

module.exports = router;