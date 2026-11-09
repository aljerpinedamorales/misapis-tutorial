const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    stock: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);