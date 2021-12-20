const models = require('../models/index');



const login = async (req, res) => {
    try {
        
        console.log(req.session.usuarioActual);
        const nombreUsuario = req.body.nombreUsuario;
        const contraseña = req.body.contraseña;

        if (!nombreUsuario) {
            return res.status(400).json({ msg: "nombreUsuario field is required.", error: true });
        }
        if (!contraseña) {
            return res.status(400).json({ msg: "contraseña field is required.", error: true });
        }
        const response = await models.Usuarios.findOne({ nombreUsuario: req.body.nombreUsuario, contraseña: req.body.contraseña });
        if (response) {
            req.session.usuarioActual = response.nombreUsuario;
            req.session.permisos = response.permisos;
            req.session.save();
            //console.log(req.session);
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


module.exports = { login: login };
