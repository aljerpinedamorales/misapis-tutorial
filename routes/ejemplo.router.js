import { Router } from 'express';
import { 
    getAllEjemplos,
    getEjemploproId
} from '../controllers/ejemplo.controller.js';

const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);

ejemplo.get('/:id', getEjemploproId);

ejemplo.put('/:id', (req, res) => {
    const body = req.body;

    res.json({
        msg: 'put API',
        body
    });
});

ejemplo.post('/', (req, res) => {
    const body = req.body;

    res.json({
        msg: 'post API',
        body
    })
});

ejemplo.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'delete API'
    })
});

export default ejemplo;