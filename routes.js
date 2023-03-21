import { Router } from 'express';
import { aboutController } from './controllers/aboutController.js';
import { accessoriesControllers } from './controllers/accessoryController.js';
import { productController } from './controllers/productController.js';

export const routers = Router();



routers.use("/products", productController);
routers.use("/accessories", accessoriesControllers);
routers.use("/about", aboutController);
routers.get("*", (req, res)=>{
    res.render("404")
})
