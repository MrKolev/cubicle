import { Router } from 'express';
import { isAdmin, isLoggedIn } from '../middlewares/auth.js';
import { accessoriesServer } from '../services/accessoryService.js';
import { productsServer } from '../services/productService.js';
import { validateAccessory } from './helpers/helperAccessory.js';
const router = Router();

router.get('/create', isAdmin, (req, res) => {
    res.render('createAccessory', {
        title: "Create Accessory",
        name: true,
        description: true,
        imageUrl: true
    })
})

router.get(`/delete/:accerID/:productId`, isLoggedIn, (req, res) => {
    let accerID = req.params.accerID
    let productId = req.params.productId
    productsServer.deleteAccessory(accerID, productId)
        .then(() => res.redirect(`/products/details/${productId}`))
        .catch((error) => {
            console.log(error)
            res.status(500).render("500");
        })
})

router.post('/create', validateAccessory, isAdmin, (req, res) => {
    accessoriesServer.create(req.body)
        .then(() => res.redirect('/products'))
        .catch((error) => {
            console.log(error)
            res.status(500).render("500")
        })

})

export { router as accessoriesControllers };