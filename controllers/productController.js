import { Router } from 'express';
import { validateProduct } from './helpers/helperProduct.js';
import { productsServer } from '../services/productService.js'

const router = Router();

router.get("/", (req, res) => {
    productsServer.getAll(req.query)
        .then((products) => {
            res.render("home", {
                title: "Home",
                products,
                query: req.query
            })
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
    productsServer.create(req.body)
        .then(() => res.redirect("/products"))
        .catch((error) => {
            console.log(error)
            res.status(500).render("500")
        })
})

router.get("/details/:productId", (req, res) => {
    productsServer.getById(req.params.productId)
        .then((products) => {
            res.render("details", {
                title: "Product Details",
                products,
                query: req.query
            })
        })
})

export { router as productController };