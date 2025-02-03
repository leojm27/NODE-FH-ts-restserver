import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/usuario.routes';

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

    // TODO: conectar BD

    // funciones que se ejecutan antes de las rutas
    middlewares() {
        // CORS
        // habilitamos las peticiones cross-domain por defecto.
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
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }

}

export default Server;