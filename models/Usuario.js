const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    usuario : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre : {
        type: String,
        required: true,
        trim: true
    },
    contrasenia : {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
