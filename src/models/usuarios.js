const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    permisos: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Usuarios", UsuariosSchema);