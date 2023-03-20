import { Router } from 'express';
import { validateProduct } from './helpers/helperProduct.js';
import {productsServer} from '../services/productService.js'

const router = Router();


router.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        products: "",
        query: req.query
    })
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
    console.log(req.body);
    productsServer.create(req.body)
        .then(() => res.redirect("/products"))
        .catch((error) => {
            console.log(error) 
            res.status(500).render("500")})
})



router.get("/details/:productId", (req, res) => {
    res.render("details", {
        title: "Product Details",
        product: getById(req.params.productId)
    })
})

export { router as productController };