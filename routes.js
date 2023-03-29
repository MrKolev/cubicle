import { Router } from 'express';
import { aboutController } from './controllers/aboutController.js';
import { accessoriesControllers } from './controllers/accessoryController.js';
import { authControler } from './controllers/authControler.js';
import { productController } from './controllers/productController.js';
import { isLoggedIn } from './middlewares/auth.js';

export const routers = Router();


routers.use("/", productController);
routers.use("/auth", authControler);
routers.use("/products", productController);
routers.use("/accessories", isLoggedIn, accessoriesControllers);
routers.use("/about", aboutController);
routers.get("*", (req, res) => {
    res.render("404")
})
