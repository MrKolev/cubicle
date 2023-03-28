import { Router } from 'express';
import { validateProduct } from './helpers/helperProduct.js';
import { productsServer } from '../services/productService.js'
import { accessoriesServer } from '../services/accessoryService.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = Router();

router.get("/", (req, res) => {
    productsServer.getAll(req.query)
        .then((products) => {
            res.render("home", {
                title: "Home",
                products,
                query: req.query,
                user: req.user
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render("500")
        })

})

router.get("/create", isLoggedIn, (req, res) => {
    res.render("create", {
        title: "Create",
        name: true,
        description: true,
        imageUrl: true
    })
})
router.get("/:productId/attach", isLoggedIn, async (req, res) => {
    let product = await productsServer.getById(req.params.productId);
    let accessories = await accessoriesServer.getNameAndId(product.accessories);

    res.render("attachAccessory", {
        product,
        accessories
    })

})
router.post("/:productId/attach", isLoggedIn, async (req, res) => {
    productsServer.attachAccessory(req.params.productId, req.body)
        .then((product) =>
            res.redirect(`/products/details/${req.params.productId}`))
        .catch((error) => {
            console.log(error)
            res.status(500).render("500")
        })

})

router.post("/create", validateProduct, isLoggedIn, (req, res) => {
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
            let isLoading = false;
            if (req.user) {
                isLoading = true;
            }
            products.accessories.forEach(accessory => {
                accessory.productId = req.params.productId;
                accessory.user = isLoading;
            })
            res.render("details", {
                title: "Product Details",
                products,
                query: req.query,
                user: isLoading
            })
        })
})

export { router as productController };