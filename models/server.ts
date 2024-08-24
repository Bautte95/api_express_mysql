import express, { Application } from 'express';
import userRouter from '../routes/users';
import cors from "cors";
import db from '../bd/connection';
import { errorHandler } from '../middlewares/errorHandlerMiddleware';

 class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();

        this.routes();

        this.app.use(errorHandler);
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (error) {
            throw new Error(`Error presentado: ${error}`);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        // LECTURA DEL BODY
        this.app.use(express.json() );

        //CARPETA PUBLICA

        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPath.users, userRouter)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corrriendo en el puerto !!! ${this.port}`)
        })
    }
}

export default Server;