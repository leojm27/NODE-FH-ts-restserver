import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuario.routes';
import db from '../db/connection';

class Server {

    private readonly app: Application;
    private readonly port: string;
    private readonly apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? '3000';

        // Metodos iniciales
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error((error instanceof Error) ? error.message : String(error))
        }
    }

    middlewares() {
        // CORS - habilitamos las peticiones cross-domain por defecto.
        this.app.use(cors());

        // Lectura body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use(express.static('src/public'))
    }


    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            this.init();
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }

    async init() {
        await this.dbConnection();
    }

}

export default Server;