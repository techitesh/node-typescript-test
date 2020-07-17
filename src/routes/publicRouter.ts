import { Router } from "express";
import providerRoutes from './provider.routes'
import ProductsRoutes from './product.routes'

class ProviderRouter {
    public router: Router = Router();

    constructor() {
        this.createRoutes();
    }
    public createRoutes() {
        this.router.use("/providers", providerRoutes);
        this.router.use("/products", ProductsRoutes)
    }

}

export default new ProviderRouter().router;
