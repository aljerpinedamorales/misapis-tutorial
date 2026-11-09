const { response } = require('express');
const Producto = require('../models/producto.model.js');

// Obtener todos los productos
const obtenerProductos = async (req, res = response) => {
    try {
        const productos = await Producto.find({ estado: true });
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error
        });
    }
};

// Crear un producto
const crearProducto = async (req, res = response) => {
    const { nombre, precio, categoria, stock } = req.body;
    
    try {
        const producto = new Producto({ nombre, precio, categoria, stock });
        await producto.save();

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el producto',
            error
        });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, ...data } = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, data, { new: true });
        res.json({
            ok: true,
            producto: productoActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar',
            error
        });
    }
};

// Eliminar (borrado lógico) un producto
const eliminarProducto = async (req, res = response) => {
    const { id } = req.params;
    try {
        const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            ok: true,
            producto: productoBorrado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar',
            error
        });
    }
};

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};