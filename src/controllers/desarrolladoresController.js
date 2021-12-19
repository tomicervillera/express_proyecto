const models = require('../models/index');
const mongoose = require('mongoose');

const objectIdValidator = mongoose.Types.ObjectId;

const getDesarrolladores = async (req, res) => {
    try {
        const response = await models.Desarrolladores.find();
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
};

const getDesarrolladorById = async (req, res) => {
    try {
        const desarrolladorId = req.params.id;
        const isValid = objectIdValidator.isValid(desarrolladorId);

        if (!isValid) {
            return res.status(400).json({ msg: `Invalid MongoDB Object ID.`, error: true });
        }
        const response = await models.Desarrolladores.findById(desarrolladorId);
        if (response) {
            return res.status(200).json({ data: response, error: false });
        }
        else {
            return res.status(404).json({ msg: `Developer ${req.params.id} not found.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addDesarrollador = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const img = req.body.img;

        if (!nombre) {
            return res.status(400).json({ msg: "nombre field is required.", error: true });
        }
        if (!img) {
            return res.status(400).json({ msg: "img field is required.", error: true });
        }
        const desarrollador = new models.Desarrolladores(req.body);
        await desarrollador.save();
        res.status(200).json({ data: desarrollador, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }

}

module.exports = { getDesarrolladores: getDesarrolladores, getDesarrolladorById: getDesarrolladorById, addDesarrollador: addDesarrollador };
