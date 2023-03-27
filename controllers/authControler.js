import { Router } from "express";
import { authService } from "../services/authService.js";

const router = Router();

router.get('/login', (req, res) => {
    res.render("login", {
        title: "Login",
        username: true,
        password: true,
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body
    try {

        if (!username || !password) throw { message: "Fill in all the fields." }

        await authService.login(username, password)

    } catch (error) {
        res.render("login", {
            title: "Error Login",
            error
        })
    }
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

router.post('/register', async (req, res) => {
    const {
        username,
        password,
        repeatPassword,
        email
    } = req.body

    try {
        if (!username || !password || !repeatPassword || !email) throw { message: "Fill in all the fields." }

        if (username.length < 2) throw { message: "Username must be a minimum of two characters." }

        if (password !== repeatPassword) throw { message: "The passwords do not match." }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) throw { message: "You have entered an invalid email address!" }

        if (await authService.userCheck(username)) throw { message: "Username already exists." }
        if (await authService.emailCheck(email)) throw { message: "Email address is already associated with another user." }

        await authService.register(username, password, email);

        res.redirect("/");


    } catch (error) {
        res.render("register", {
            title: "Register",
            username,
            password,
            repeatPassword,
            email,
            data: req.body,
            error
        })
    }
})


export { router as authControler };