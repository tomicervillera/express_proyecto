const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/UsuariosController");

router.post("/", UsuariosController.getUsuarioByEmailPass);

module.exports = router;