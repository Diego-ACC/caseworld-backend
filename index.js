//Documento del servidor
express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.static('public'));
app.use(express.json());


console.log('Middleware y rutas configuradas correctamente');


//Rutas
const productosRouter = require('./rutas/productos.js'); //Rutas de productos


app.use('/productos', productosRouter);


//Puerto de escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})