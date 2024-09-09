const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'});
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) =>  {
    // Revisar si hay errores
    // Mostrar mensajes de error de express-validator
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //Buscar usuario para ver si esta registrado
    const { usuario, contrasenia } = req.body;
    const user = await Usuario.findOne({ usuario });


    // if(!user) {
    //     res.status(401).json({msg : 'El usuario No Existe'});
    //     return next();
    // }

    if (!user && usuario != process.env.ADMIN) {
        res.status(401).json({msg: 'Usuario/password Incorrecto'})
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    // const adminPass = await bcrypt.hash(process.env.PASSWORD, salt);
    const adminPass = await bcrypt.hash(contrasenia, salt);

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(contrasenia, adminPass)) {

        // Crear JWT
        const token = jwt.sign({
            id: 1,
            nombre: "Admin",
            usuario: process.env.ADMIN
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        return res.json({token});

    } else {
        res.status(401).json({msg: 'Usuario/password Incorrecto3'})
        return next();
    }

}

exports.usuarioAutenticado = (req, res, next) => {
    res.json({usuario: req.usuario});
}
