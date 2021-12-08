const express = require("express");
const router = express.Router();
const personajesController = require("../controllers/personajesController");

router.get("/", personajesController.getPersonajes);
router.get("/:id", personajesController.getPersonajeById);
router.post("/", personajesController.addPersonaje);

module.exports = router;