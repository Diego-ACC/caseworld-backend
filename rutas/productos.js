const express = require('express');
const db = require('../db.js');
const productosRouter = express.Router();
const ProductosModel = require('../models/mProductos.js');

// Función para validar productos
function validarProducto(producto) {
    const { nombre, categoria, marca, precio, imagen_url } = producto;

    if (!nombre || !categoria || !marca || !precio || !imagen_url) {
        return 'Todos los campos obligatorios deben estar completos.';
    }

    if (isNaN(precio) || Number(precio) <= 0) {
        return 'El precio debe ser un número positivo.';
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (!urlRegex.test(imagen_url)) {
        return 'La URL de la imagen no es válida.';
    }

    return null;
}



// ----------- RUTAS POST ----------- //
//Ruta POST para agregar un producto
productosRouter.post('/', async (req, res) => {
    const error = validarProducto(req.body);
    if (error) return res.status(400).json({ error });

    const { nombre, descripcion, categoria, marca, precio, imagen_url, disponible } = req.body;

    try {
        const nuevoProducto =  await ProductosModel.agregarProducto(nombre, descripcion, categoria, marca, precio, imagen_url, disponible);
        res.json({ producto: nuevoProducto[0] });
    } catch (error) {
        console.error('Error al agregar producto:', err);
        res.status(500).json({ error: 'Error del servidor al agregar producto', detalle: error.message});
    }
});



// ----------- RUTAS GET ----------- //
//GET /productos con filtros opcionales
productosRouter.get('/', async(req, res) => {
    try{
        const filtros = req.query;
        const productos = await ProductosModel.getProductosFiltrados(filtros);
        res.json({ productos });
    }catch(error){
        console.error('Error al obtener productos filtrdos: ', error);
        return res.status(500).json({ error: 'Error interno al obtener productos'});
    }
});

//Obtener todas las marcas disponibles
productosRouter.get('/marcas', async(req, res) => {
    try {
        const marcas = await db('productos').distinct('marca');
        res.json(marcas.map(m => m.marca));
    }catch (error){
        console.error('Error al obtener marcas: ', error);
        res.status(500).json({ error: 'Error al obtener marcas'});
    }
});


//Obtener todas las categorías disponibles
productosRouter.get('/categorias', async (req, res) => {
    try {
        const categorias = await db('productos').distinct('categoria');
        res.json(categorias.map(c => c.categoria));
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});



// ----------- RUTAS PUT ----------- //
//Actualizar por ID
productosRouter.put('/:id', async(req, res) => {
    const {id} = req.params;
    const nuevosDATOS = req.body;

    try {
        const actualizado = await ProductosModel.actualizarProducto(id, nuevosDATOS);

        if(actualizado){
            res.json({mensaje: 'Producto actualizado', producto: {id, ...nuevosDATOS} });
        }else{
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    }catch(error){
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno al actualizar producto', detalle: error.message});
    }
});



// ----------- RUTAS DELETE ----------- //
//Eliminar un producto por ID
productosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await ProductosModel.eliminarProducto(id);

        if (eliminado) {
            res.json({ mensaje: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno al eliminar producto' });
    }
});

module.exports = productosRouter;