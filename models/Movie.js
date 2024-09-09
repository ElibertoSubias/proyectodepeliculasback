const mongoose = require('mongoose');

const MoviesSchema = mongoose.Schema({
    idMovie: {
        type: String,
        require: false,
        trim: true
    },
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    sinopsis: {
        type: String,
        require: true,
        trim: true
    },
    actores: {
        type: String,
        require: true,
        trim: true
    },
    portada: {
        type: String,
        require: true,
        trim: true
    },
    categorias: {
        type: Array,
        require: true
    }
});

module.exports = mongoose.model('Movie', MoviesSchema);
