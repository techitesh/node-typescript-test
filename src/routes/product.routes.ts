import { Router } from "express";
const { ProductsController }  = require("../controllers/publicController")

class ProductRouter {
    public router: Router = Router();

    constructor() {
        this.createRoutes();
    }
    public createRoutes() {
        this.router.get("/", ProductsController.index)
        this.router.post("/create", ProductsController.create)
        this.router.patch("/:id/update", ProductsController.update)
    }

}

export default new ProductRouter().router;
