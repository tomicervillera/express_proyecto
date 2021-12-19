const mongoose = require('mongoose');

const desarrolladoresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model("Desarrolladores", desarrolladoresSchema);