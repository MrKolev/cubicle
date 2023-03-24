import { Router } from "express";
import { checkPassword } from "./helpers/helperAuth.js";

const router = Router();

router.get('/login', (req, res) => {
    res.render("login", {
        title: "Login",
        username: true,
        password: true,
    })

})

router.get('/register', (req, res) => {
    res.render("register", {
        title: "Register",
        username: true,
        email: true,
        password: true,
        repeatPassword: true
    })

})
router.post('/register', checkPassword, (req, res) => {
    res.send(req.body)

})


export { router as authControler };