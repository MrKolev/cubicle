import { Router } from 'express';
import { validateProduct } from './helpers/helperProduct.js';
import { productsServer } from '../services/productService.js'
import { accessoriesServer } from '../services/accessoryService.js';

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
router.get("/:productId/attach", async (req, res) => {
    let product = await productsServer.getById(req.params.productId);
    let accessories = await accessoriesServer.getNameAndId(product.accessories);
    console.log(accessories);

    res.render("attachAccessory", {
        product,
        accessories
    })

})
router.post("/:productId/attach", async (req, res) => {
       productsServer.attachAccessory(req.params.productId, req.body)
    .then((product) =>
     res.redirect(`/products/details/${req.params.productId}`))
    .catch((error) => {
        console.log(error)
        res.status(500).render("500")
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
    productsServer.getByIdWithAccessory(req.params.productId)
        .then((products) => {
            products.accessories.forEach(accessory => accessory.productId = req.params.productId)
            res.render("details", {
                title: "Product Details",
                products,
                query: req.query
            })
        })
})

export { router as productController };