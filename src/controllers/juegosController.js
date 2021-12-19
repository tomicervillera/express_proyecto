const models = require('../models/index');
const mongoose = require('mongoose');

const objectIdValidator = mongoose.Types.ObjectId;

const getJuegos = async (req, res) => {
    try {
        const response = await models.Juegos.find();
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
};

const getJuegoById = async (req, res) => {
    try {
        const juegoId = req.params.id;
        const isValid = objectIdValidator.isValid(juegoId);

        if (!isValid) {
            return res.status(400).json({ msg: `Invalid MongoDB Object ID.`, error: true });
        }
        const response = await models.Juegos.findById(juegoId);
        if (response) {
            return res.status(200).json({ data: response, error: false });
        }
        else {
            return res.status(404).json({ msg: `Game ${req.params.id} not found.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addJuego = async (req, res) => {
    try {
        const idPublicador = req.body.idPublicador;
        const idDesarrollador = req.body.idDesarrollador;
        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const descripcion = req.body.descripcion;
        const img = req.body.img;
        const url = req.body.url;
        const genero = req.body.url;
        const fechaPublicacion = req.body.url;

        //validacion campos

        if (!idPublicador) {
            return res.status(400).json({ msg: "idPublicador field is required.", error: true });
        }
        if (!idDesarrollador) {
            return res.status(400).json({ msg: "idDesarrollador field is required.", error: true });
        }
        if (!nombre) {
            return res.status(400).json({ msg: "nombrePelicula field is required.", error: true });
        }
        if (!precio) {
            return res.status(400).json({ msg: "precio field is required.", error: true });
        }
        if (!descripcion) {
            return res.status(400).json({ msg: "descripcion field is required.", error: true });
        }
        if (!img) {
            return res.status(400).json({ msg: "img field is required.", error: true });
        }
        if (!url) {
            return res.status(400).json({ msg: "url field is required.", error: true });
        }
        if (!genero) {
            return res.status(400).json({ msg: "genero field is required.", error: true });
        }
        if (!fechaPublicacion) {
            return res.status(400).json({ msg: "fechaPublicacion field is required.", error: true });
        }

        const juego = new models.Juegos(req.body);
        await juego.save();
        res.status(200).json({ data: juego, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const updateJuego = async (req, res) => {
    try {
        const idJuego = req.params.id;

        const juego = await models.Juegos.findByIdAndUpdate(idJuego, req.body, { new: true });

        if (juego) {
            res.status(200).json({ data: juego, error: false });
        }
        else {
            res.status(404).json({ msg: 'Game not found', error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const deleteJuego = async (req, res) => {
    try {
        const juegoId = req.params.id;

        const response = await models.Juegos.findByIdAndRemove(juegoId);
        if (response) {
            res.status(200).json({ data: response, error: false, msg: "Game deleted successfully." });
        } else {
            res.status(404).json({ msg: 'Game not found', error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

module.exports = { getJuegos: getJuegos, getJuegoById: getJuegoById, addJuego: addJuego, updateJuego: updateJuego, deleteJuego: deleteJuego };
