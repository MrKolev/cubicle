import { Router } from 'express';
import { getAll, getById, productService } from '../services/productService.js';


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

router.post("/create", (req, res) => {
    // validation input
    const data = req.body
    const { name, description, imageUrl } = data
    if (!name || !description || !imageUrl) {
        return res.render("create", {
            title: "Create",
            name: name,
            description: description,
            imageUrl: imageUrl,
            data
        })
    }

    productService(data);

    res.redirect("/products")
})



router.get("/details/:productId", (req, res) => {
    res.render("details", {
        title: "Product Details",
        product: getById(req.params.productId)
    })
    console.log(req.params.productId);
})

export { router as productController };