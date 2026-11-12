import { Router } from 'express';
import { 
    getAllEjemplos,
    getEjemploById,
    postEjemplo,
    updateEjemplo, // <--- Añadido
    deleteEjemplo  // <--- Añadido
} from '../controllers/ejemplo.controller.js';

const ejemplo = Router();

// Obtener todos
ejemplo.get('/', getAllEjemplos);

// Obtener por ID
ejemplo.get('/:id', getEjemploById);

// Crear
ejemplo.post('/', postEjemplo);

// Actualizar
ejemplo.put('/:id', updateEjemplo);

// Eliminar
ejemplo.delete('/:id', deleteEjemplo);

export default ejemplo;