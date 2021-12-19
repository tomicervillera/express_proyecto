const express = require('express');
const router = express.Router();
const juegosController = require("../controllers/juegosController");

router.get("/", juegosController.getJuegos);
router.get("/:id", juegosController.getJuegoById);
router.post("/", juegosController.addJuego);
router.put("/:id", juegosController.updateJuego);
router.delete("/:id", juegosController.deleteJuego);

module.exports = router;