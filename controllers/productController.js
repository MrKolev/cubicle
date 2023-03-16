import { Router } from 'express';
const router = Router();


router.get("/", (req, res) => {
    res.render("home", { title: "Home" })
})

router.get("/create", (req, res) => {
    res.render("create",{ title: "Create" })
})

router.post("/create",(req, res) => {
    console.log(req.body);
    
})

router.get("/details/:productId", (req, res) => {
    res.render("details",{ title: "Product Details" })
})

export { router as productController };