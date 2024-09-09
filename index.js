const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');


// Crear servidor
const app = express();

// Conectar a la Base de Datos
conectarDB();

// Habilitar Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
}
// const opcionesCors = {
//     origin: 'nodesend-cliente-buqdh82mv-elibertosubias.vercel.app',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.use(cors(opcionesCors));

// Puerto de la app
const port = process.env.PORT || 8001;

// Habilitar leer los valores de un body
app.use( express.json() );

// Habilitar carpeta publica
// app.use( express.static('uploads') );
app.use('/uploads', express.static('uploads'));

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () => {
    console.log(process.env.FRONTEND_URL);
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})
