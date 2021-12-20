const express = require("express");
const desarrolladoresRouter = require("./desarrolladoresRouter");
const juegosRouter = require("./juegosRouter");
const peliculasRouter = require("./peliculasRouter");
const personajesRouter = require("./personajesRouter");
const publicadoresRouter = require("./publicadoresRouter");
const usuariosRouter = require("./usuariosRouter");
const loginRouter = require("./loginRouter");

const router = express.Router();

router.use("/juegos", juegosRouter);
router.use("/login", loginRouter);
router.use("/desarrolladores", desarrolladoresRouter);
router.use("/publicadores", publicadoresRouter);
router.use("/peliculas", peliculasRouter);
router.use("/personajes", personajesRouter);
router.use("/usuarios", usuariosRouter);


module.exports = router;