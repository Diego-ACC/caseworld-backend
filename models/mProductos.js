//Model de Productos para tener las funciones que harán las consultas a la BD
const db = require('../db.js');

//Funciones para Productos Model
const ProductosModel = {
    getProductoByName: (nombre) => db('productos').where({nombre}),
    getProductoByCategoria: (categoria) => db('productos').where({categoria}),
    getProductoByMarca: (marca) => db('productos').where({marca}),
    getProductoByDisponibilidad: (estado) => db('productos').where({disponible: estado}),
    getAllProductos: () => db('productos').select('*'),
    getProductosFiltrados: (filtros) => {
        const query = db('productos');
        
        if (filtros.marca) {
            query.where('marca', filtros.marca);
        }
        
        if (filtros.categoria) {
            query.where('categoria', filtros.categoria);
        }
        
        if (filtros.disponible !== undefined) {
            query.where('disponible', filtros.disponible === 'true'); //viene como string desde la URL
        }

        return query.select('*');
    },
    
    
    actualizarProducto: (id, nuevosDATOS) => {
        return db('productos').where({id}).update(nuevosDATOS);
    },


    eliminarProducto: (id) => {
        return db('productos').where({id}).del();
    },


    agregarProducto: (nombre, descripcion, categoria, marca, precio, imagen_url, disponible) => {
        return db('productos').insert({nombre, descripcion, categoria, marca, precio, imagen_url, disponible}).returning('*');
    },
}

module.exports = ProductosModel; //Se exporta el modelo