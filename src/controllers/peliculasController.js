const models = require('../models/index');
const mongoose = require('mongoose');

const objectIdValidator = mongoose.Types.ObjectId;

const getPeliculas = async (req, res) => {
    try {
        const response = await models.Peliculas.find();
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
};

const getPeliculasById = async (req, res) => {
    try {
        const peliculaId = req.params.id;
        const isValid = objectIdValidator.isValid(peliculaId);

        if (!isValid) {
            return res.status(400).json({ msg: `Invalid MongoDB Object ID.`, error: true });
        }
        const response = await models.Peliculas.findById(peliculaId);
        if (response) {
            return res.status(200).json({ data: response, error: false });
        }
        else {
            return res.status(404).json({ msg: `Movie ${req.params.id} not found.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addPelicula = async (req, res) => {
    try {
        const idPersonaje = req.body.idPersonaje;
        const nombrePelicula = req.body.nombrePelicula;

        //validacion id personaje pendiente

        if (!idPersonaje) {
            return res.status(400).json({ msg: "ID field is required.", error: true });
        }
        if (!nombrePelicula) {
            return res.status(400).json({ msg: "nombrePelicula field is required.", error: true });
        }
        const pelicula = new models.Peliculas(req.body);
        await pelicula.save();
        res.status(200).json({ data: pelicula, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const updatePelicula = async (req, res) => {
    try {
        const idPelicula = req.params.id;

        const pelicula = await models.Peliculas.findByIdAndUpdate(idPelicula, req.body, { new: true });

        if (pelicula) {
            res.status(200).json({ data: pelicula, error: false });
        }
        else {
            res.status(404).json({ msg: 'Movie not found', error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const deletePelicula = async (req, res) => {
    try {
        const peliculaId = req.params.id;

        const response = await models.Peliculas.findByIdAndRemove(peliculaId);
        if (response) {
            res.status(200).json({ data: response, error: false, msg: "Movie deleted successfully." });
        } else {
            res.status(404).json({ msg: 'Movie not found', error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

module.exports = { getPeliculas, getPeliculasById, addPelicula, updatePelicula, deletePelicula };
