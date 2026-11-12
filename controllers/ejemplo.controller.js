import Ejemplo from '../models/ejemplo.model.js';
import mongoose from 'mongoose';

export const getAllEjemplos = async (req, res) => {
    console.log('obtiene todos los ejemplos');
    try {
        const ejemplos = await Ejemplo.find({}, { __v: 0 });
        if (ejemplos.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron ejemplos'
            });
        }
        return res.status(200).json({
            ejemplos
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los ejemplos',
            error: error.message
        });
    }
};

export const getEjemploById = async (req, res) => {
    console.log('EJEMPLO POR ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const ejemplo = await Ejemplo.findById(id, { __v: 0 });
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }
        return res.status(200).json({
            ejemplo
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener el ejemplo',
            error: error.message
        });
    }
};

export const postEjemplo = async (req, res) => {
    console.log('CREAR EJEMPLO');
    try {
        const body = req.body;
        const nuevoEjemplo = new Ejemplo(body);
        
        await nuevoEjemplo.save();

        return res.status(201).json({
            msg: 'Ejemplo creado exitosamente',
            ejemplo: nuevoEjemplo
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al crear el ejemplo',
            error: error.message
        });
    }
};

export const updateEjemplo = async (req, res) => {
    console.log('ACTUALIZAR EJEMPLO');
    const id = req.params.id;
    const body = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const ejemploActualizado = await Ejemplo.findByIdAndUpdate(id, body, { 
            new: true, // Devuelve el documento actualizado
            runValidators: true // Aplica las validaciones del esquema en la actualización
        });

        if (!ejemploActualizado) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado para actualizar'
            });
        }

        return res.status(200).json({
            msg: 'Ejemplo actualizado correctamente',
            ejemplo: ejemploActualizado
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el ejemplo',
            error: error.message
        });
    }
};

export const deleteEjemplo = async (req, res) => {
    console.log('ELIMINAR EJEMPLO');
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const ejemploEliminado = await Ejemplo.findByIdAndDelete(id);

        if (!ejemploEliminado) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado para eliminar'
            });
        }

        return res.status(200).json({
            msg: 'Ejemplo eliminado correctamente',
            ejemplo: ejemploEliminado
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el ejemplo',
            error: error.message
        });
    }
};