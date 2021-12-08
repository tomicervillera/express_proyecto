const models = require('../models/index');
const mongoose = require('mongoose');

const objectIdValidator = mongoose.Types.ObjectId;

const getPersonajes = async (req, res) => {
    try {
        const response = await models.Personajes.find();
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
};

const getPersonajeById = async (req, res) => {
    try {
        const personajeId = req.params.id;
        const isValid = objectIdValidator.isValid(personajeId);

        if (!isValid) {
            return res.status(400).json({ msg: `Invalid MongoDB Object ID.`, error: true });
        }
        const response = await models.Personajes.findById(personajeId);
        if (response) {
            return res.status(200).json({ data: response, error: false });
        }
        else {
            return res.status(404).json({ msg: `Character ${req.params.id} not found.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addPersonaje = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const casa = req.body.casa;

        if (!nombre) {
            return res.status(400).json({ msg: "nombre field is required.", error: true });
        }
        if (!casa) {
            return res.status(400).json({ msg: "casa field is required.", error: true });
        }
        const personaje = new models.Personajes(req.body);
        await personaje.save();
        res.status(200).json({ data: personaje, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }

}

module.exports = { getPersonajes, getPersonajeById, addPersonaje };
