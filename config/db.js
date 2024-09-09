const mongoose = require('mongoose');
require('dotenv').config({ path: 'variable.env'});

const conectarDB = async () => {
    try {

        await mongoose.connect(process.env.DB_URL, {});

        console.log('DB Conectada');

    } catch (error) {
        console.log('Hubo un error al conectarsee a la bd');
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;
