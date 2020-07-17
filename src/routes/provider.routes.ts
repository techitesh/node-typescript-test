import { Router } from "express";
const { ProviderController } = require('../controllers/publicController')


class ProviderRouter {
    public router: Router = Router();

    constructor() {
        this.createRoutes();
    }
    public createRoutes() {
        this.router.get("/", ProviderController.index)
        this.router.post("/create", ProviderController.create)
    }

}

export default new ProviderRouter().router;
