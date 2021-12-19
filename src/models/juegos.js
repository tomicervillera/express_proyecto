const mongoose = require('mongoose');

const juegosSchema = new mongoose.Schema({
    idPublicador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publicadores",
        required: true
    },
    idDesarrollador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Desarrolladores",
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    img: {
        type: String
    },
    url: {
        type: String
    },
    genero: {
        type: String
    },
    fechaPublicacion: {
        type: Date
    }
});

module.exports = mongoose.model("Juegos", juegosSchema);