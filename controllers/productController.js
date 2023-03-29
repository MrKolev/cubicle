import { Router } from 'express';
import { validateProductInput } from './helpers/helperProduct.js';
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
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render("500")
        });
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
        accessories,
        title: "Attach accessory"
    });
})

router.get("/products/:productId/edit", isLoggedIn, async (req, res) => {
    let product = await productsServer.getById(req.params.productId);
    res.render("editCube", {
        title: "Edit Cube",
        name: true,
        description: true,
        imageUrl: true,
        data: product
    });
})

router.post("/:productId/attach", isLoggedIn, async (req, res) => {
    productsServer.attachAccessory(req.params.productId, req.body)
        .then((product) =>
            res.redirect(`/products/details/${req.params.productId}`))
        .catch((error) => {
            console.log(error);
            res.status(500).render("500");
        });
})

router.post("/:from/create", validateProductInput, isLoggedIn, (req, res) => {
    productsServer.create(req.body)
        .then(() => res.redirect("/products"))
        .catch((error) => {
            console.log(error);
            res.status(500).render("500");
        });
})

router.post("/:from/:productId/edit", validateProductInput, isLoggedIn, (req, res) => {
    productsServer.updateOne(req.params.productId ,req.body)
        .then(() => res.redirect("/products/details/" + req.params.productId))
        .catch((error) => {
            console.log(error);
            res.status(500).render("500");
        });
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
                accessory.admin = isLoading;
            });
            res.render("details", {
                title: "Product Details",
                products,
                query: req.query
            });
        });
})

export { router as productController };