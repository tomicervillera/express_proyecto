const express = require("express");
const router = express.Router();
const publicadoresController = require("../controllers/publicadoresController");

router.get("/", publicadoresController.getPublicadores);
router.get("/:id", publicadoresController.getPublicadorById);
router.post("/", publicadoresController.addPublicador);

module.exports = router;