import { Router } from 'express';
import { getAll, getById, productService } from '../services/productService.js';
import { validateProduct } from './helpers/helperProduct.js';


const router = Router();


router.get("/", (req, res) => {
    res.render("home", { title: "Home", products: getAll() })
})

router.get("/create", (req, res) => {
    res.render("create", {
        title: "Create",
        name: true,
        description: true,
        imageUrl: true
    })
})

router.post("/create", validateProduct, (req, res) => {
    productService(req.body)
        .then(() => res.redirect("/products"))
        .catch(() => res.status(500).render("500"))
})



router.get("/details/:productId", (req, res) => {
    res.render("details", {
        title: "Product Details",
        product: getById(req.params.productId)
    })
    console.log(req.params.productId);
})

export { router as productController };