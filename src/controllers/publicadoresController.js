const models = require('../models/index');
const mongoose = require('mongoose');

const objectIdValidator = mongoose.Types.ObjectId;

const getPublicadores = async (req, res) => {
    try {
        const response = await models.Publicadores.find();
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
};

const getPublicadorById = async (req, res) => {
    try {
        const publicadorId = req.params.id;
        const isValid = objectIdValidator.isValid(publicadorId);

        if (!isValid) {
            return res.status(400).json({ msg: `Invalid MongoDB Object ID.`, error: true });
        }
        const response = await models.Publicadores.findById(publicadorId);
        if (response) {
            return res.status(200).json({ data: response, error: false });
        }
        else {
            return res.status(404).json({ msg: `Publisher ${req.params.id} not found.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addPublicador = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const img = req.body.img;

        if (!nombre) {
            return res.status(400).json({ msg: "nombre field is required.", error: true });
        }
        if (!img) {
            return res.status(400).json({ msg: "img field is required.", error: true });
        }
        const publicador = new models.Publicadores(req.body);
        await publicador.save();
        res.status(200).json({ data: publicador, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }

}

module.exports = { getPublicadores: getPublicadores, getPublicadorById: getPublicadorById, addPublicador: addPublicador };
