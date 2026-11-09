const { Router } = require('express');
const { 
    obtenerProductos, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} = require('../controllers/producto.controller.js');

const router = Router();

// Rutas base ej: /api/productos
router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;