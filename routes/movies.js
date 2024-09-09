const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una nueva pelicula
// api/movies
router.post('/',
    auth,
    [
        check('titulo', 'Titulo de la pelicula es obligatorio').not().isEmpty(),
        check('sinopsis', 'Sinopsis de la pelicula es obligatorio').not().isEmpty(),
        check('actores', 'Actores es obligatorio').not().isEmpty(),
        check('portada', 'Portada es obligatorio').not().isEmpty(),
        check('categorias', 'Categorias es obligatorio').not().isEmpty()
    ],
    movieController.newMovie
);

// Obtener todos las peliculas
router.get('/',
    movieController.getAllMovies
);

// Obtener pelicula por id
router.get('/:idMovie',
    auth,
    movieController.getMovie
);

// Actualizar pelicula
router.put('/:id',
    auth,
    movieController.updateMovie
);

// Eliminar pelicula
router.delete('/:id',
    auth,
    movieController.deleteMovie
);

// Buscar por filtro
router.get('/titulo/:titulo',
    movieController.getByFilterMovies
);

module.exports = router;
