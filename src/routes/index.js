const express = require("express");
const desarrolladoresRouter = require("./desarrolladoresRouter");
const juegosRouter = require("./juegosRouter");
const peliculasRouter = require("./peliculasRouter");
const personajesRouter = require("./personajesRouter");
const publicadoresRouter = require("./publicadoresRouter");

const router = express.Router();

router.use("/juegos", juegosRouter);
router.use("/desarrolladores", desarrolladoresRouter);
router.use("/publicadores", publicadoresRouter);
router.use("/peliculas", peliculasRouter);
router.use("/personajes", personajesRouter);

module.exports = router;