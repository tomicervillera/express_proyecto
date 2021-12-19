const express = require("express");
const router = express.Router();
const desarrolladoresController = require("../controllers/desarrolladoresController");

router.get("/", desarrolladoresController.getDesarrolladores);
router.get("/:id", desarrolladoresController.getDesarrolladorById);
router.post("/", desarrolladoresController.addDesarrollador);

module.exports = router;