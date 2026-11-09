import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import * as db from '../db/cnn_mongodb.js';
import indexRoutes from '../routes/index.router.js';
import productoRoutes from '../routes/producto.router.js'; // 1. Importas arriba

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api/';

        // 1. Middlewares (primero se configuran para que procesen JSON y CORS)
        this.middlewares();

        // 2. Rutas de mi aplicación
        this.routes();
    }

    async conectarDBMongo() {
        if (!db.isConected) {
            await db.conectarAMongoDB();
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // Rutas generales (ej: /api/)
        this.app.use(this.generalRoute, indexRoutes);

        // 2. Usas la importación limpia aquí
        this.app.use('/api/productos', productoRoutes);

        // Ruta 404 para endpoints no encontrados
        this.app.use('**', (req, res) => {
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', `${this.port}`);
        });
    }
}