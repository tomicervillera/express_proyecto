const models = require('../models/index');
//const mongoose = require('mongoose');

//const objectIdValidator = mongoose.Types.ObjectId;


const getUsuarioByEmailPass = async (req, res) => {
    try {
        const nombreUsuario = req.body.nombreUsuario;
        const contraseña = req.body.contraseña;

        if (!nombreUsuario) {
            return res.status(400).json({ msg: "nombreUsuario field is required.", error: true });
        }
        if (!contraseña) {
            return res.status(400).json({ msg: "contraseña field is required.", error: true });
        }
        const response = await models.Usuarios.findOne({ nombreUsuario: req.body.nombreUsuario, contraseña: req.body.contraseña });
        // if (response) {
        //     return res.status(200).json({ data: response, error: false });
        // }
        if (response) {
            let data = { nombreUsuario: response.nombreUsuario, permisos: response.permisos };
            return res.status(200).json({ data, error: false });
        }
        else {
            return res.status(404).json({ msg: `User and/or password not valid.`, error: true });
        }
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
}

const addUsuario = async (req, res) => {
    try {
        const nombreUsuario = req.body.nombreUsuario;
        const email = req.body.email;
        const contraseña = req.body.contraseña;
        const permisos = req.body.permisos;

        if (!nombreUsuario) {
            return res.status(400).json({ msg: "nombreUsuario field is required.", error: true });
        }
        if (!email) {
            return res.status(400).json({ msg: "email field is required.", error: true });
        }
        if (!contraseña) {
            return res.status(400).json({ msg: "contraseña field is required.", error: true });
        }
        if (!permisos) {
            return res.status(400).json({ msg: "email field is required.", error: true });
        }
        const usuario = new models.Usuarios(req.body);
        await usuario.save();
        res.status(200).json({ data: usuario, error: false });

    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }

}

module.exports = { getUsuarioByEmailPass: getUsuarioByEmailPass, addUsuario: addUsuario };
