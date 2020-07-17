import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";
import * as express from 'express';
import 'module-alias/register';
import * as morgan from 'morgan';
import { argv as args } from 'yargs';
import * as mongoose from 'mongoose'

import publicRoutes from './routes/publicRouter'

class Server {
    public app: express.Application = express()
    public router: express.Router = express.Router()

    constructor() {
        const envFile = (args.env && args.env === "prod") ? '.env.prod' : '.env.local'
        dotenv.config({ path: envFile })
        this.initMiddlewares();
        this.initRoutes();
        this.initDatabase();
        this.listen();
    }

    /** Express Middlewares */
   initMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(cookieParser())
        this.app.use(`/api/${process.env.API_VERSION}`, this.router)
        this.app.use(morgan((process.env.NODE_ENV === "prod") ? "combined" : "dev"))
    }

    /** Express Routes */
    initRoutes() {
        this.router.use('/', publicRoutes)
    }

    /** This Initialize mongoDB connection */
    initDatabase() {
        /* tslint:disable */
        mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
        .then(() => console.log(`Connected to MongoDB`))
        .catch(error => console.log(error.message))
    }

    /** Creates an HTTP Server for Express App */
    listen() {
        this.app.listen(process.env.PORT, () => {
            // tslint:disable-next-line
            console.log(`Server Running on PORT ${process.env.PORT}`)
        })
    }
}

module.exports = new Server().app
