const { log } = require('util');
const Movie = require('../models/Movie');
const { validationResult } = require('express-validator');
const errorLog = require('../util/logger').errorlog;
const successlog = require('../util/logger').successlog;

// Crear nueva pelicula
exports.newMovie = async (req, res) => {
    
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try {

        const ultimoidMovie = await Movie.find().sort({ idMovie: -1 }).limit(1);

        if (ultimoidMovie && ultimoidMovie.length > 0) {
            req.body.idMovie = String(parseInt(ultimoidMovie[0].idMovie) + 1);
        } else {
            req.body.idMovie = "9000";
        }

        // Crear el pelicula
        const movie = new Movie(req.body);
        await movie.save();
        // successlog.info(`Se crea pelicula: ${movie}`);
        res.json({movie});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear la pelicula');
    }

}

// Obtener pelicula por id
exports.getMovie = async (req, res) => {

    try {

        const { idMovie } = req.params;
        const movieExistente = await Movie.findOne({idMovie: idMovie});

        if (!movieExistente) {
            return res.status(404).json({msg: 'La pelicula no existe'});
        }

        res.json({movieExistente});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener la pelicula');
    }

}


// Obtener todas las peliculas
exports.getAllMovies = async (req, res) => {

    try {

        const peliculas = await Movie.find({});

        if (!peliculas) {
            return res.status(404).json({msg: 'No existen peliculas registradas'});
        }

        res.json({peliculas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las peliculas');
    }

}

// Actualizar pelicula
exports.updateMovie = async (req, res) => {
    try {

        const { titulo, sinopsis, actores, portada, categorias } = req.body;

        // Si la pelicula existe o no
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({msg: 'Pelicula no encontrada'});
        }

        // Crear un objeto con la nueva informacion
        const newMovie = {};

        newMovie.idMovie = movie.idMovie;
        newMovie.titulo = titulo;
        newMovie.sinopsis = sinopsis;
        newMovie.actores = actores;
        newMovie.portada = portada;
        newMovie.categorias = categorias;

        // Actualizar
        movie = await Movie.findOneAndUpdate({_id : req.params.id}, newMovie, {new : true});

        res.json({movie});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la pelicula: ');
    }
}

// Eliminar pelicula
exports.deleteMovie = async (req, res) => {
    try {

        // Si la Pelicula existe o no
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({msg: 'Pelicula no encontrada'});
        }

        // Eliminar
        await Movie.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Pelicula eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la pelicula.');
    }
}

// Obtener pelicula por id
exports.getByFilterMovies = async (req, res) => {

    try {

        const { titulo } = req.params;
        const peliculas = await Movie.find({ 'titulo': new RegExp(titulo, 'i') });

        if (!peliculas) {
            return res.status(404).json({msg: 'La pelicula no existe'});
        }

        res.json({peliculas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener la pelicula');
    }

}
