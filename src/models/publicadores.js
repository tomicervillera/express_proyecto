const mongoose = require('mongoose');

const publicadoresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model("Publicadores", publicadoresSchema);