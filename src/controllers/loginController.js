//const express = require("express");
const usuariosController = require('./usuariosController');
//const mongoose = require('mongoose');

//const objectIdValidator = mongoose.Types.ObjectId;


const login = async (req, res) => {
    usuariosController.getUsuarioByEmailPass(req, res);
}


module.exports = { login: login};
