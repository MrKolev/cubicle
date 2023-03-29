import { Router } from "express";
import { config } from "../config/config.js";
import { isLogin, notLogin } from "../middlewares/auth.js";
import { authService } from "../services/authService.js";

const router = Router();

router.get('/logout', isLogin, (req, res) => {
    res.clearCookie(config.TOKEN_NAME)
        .redirect("/")
})

router.get('/login',notLogin,  (req, res) => {
    res.render("login", {
        title: "Login",
        username: true,
        password: true,
    })
})

router.get('/register', notLogin, (req, res) => {
    res.render("register", {
        title: "Register",
        username: true,
        email: true,
        password: true,
        repeatPassword: true
    })

})

router.post('/login', notLogin, async (req, res) => {
    const { username, password } = req.body
    try {

        if (!username || !password) throw { message: "Fill in all the fields." }

        let token = await authService.login(username, password);

        res.cookie(config.TOKEN_NAME, token);

        res.redirect("/")

    } catch (error) {
        res.render("login", {
            title: "Error Login",
            error
        })
    }
})

router.post('/register', notLogin, async (req, res) => {
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

        await authService.userCheck(username);
        await authService.emailCheck(email);

        let token = await authService.register(username, password, email);

        res.cookie(config.TOKEN_NAME, token);

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