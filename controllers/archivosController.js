const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Movie = require('../models/Movie');

exports.subirArchivo = async (req, res, next) =>  {
    // console.log(req);
    const configuracionMulter = {
        limits: {fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024},
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
            // fileFilter: (req, file, cb) => {
            //     if(file.mimetype === "application/pdf") {
            //         return cb(null, true);
            //     }
            // }
        })
    };

    const upload = multer(configuracionMulter).single('archivo');    
    
    upload( req, res, async (error) => {
        // console.log(req.file);

        if(!error) {

            let movie = await Movie.findById(req.params.id);

            if (!movie) {
                return res.status(404).json({msg: 'Pelicula no encontrada'});
            }

            // Crear un objeto con la nueva informacion
            const newMovie = {};

            newMovie.portada = req.file.filename;

            // Actualizar
            movie = await Movie.findOneAndUpdate({_id : req.params.id}, newMovie, {new : true});

            res.json({archivo: req.file.filename});
        } else {
            console.log(error);
            return next();
        }
    });
}

exports.eliminarArchivo = async (req, res, next) =>  {
    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`);
        // console.log('Archivo eliminado');
    } catch (error) {
        console.log(error);
    }
}