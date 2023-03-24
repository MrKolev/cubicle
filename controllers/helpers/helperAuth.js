export function checkPassword(req, res, next) {
    const {
        username,
        password,
        repeatPassword,
        email
    } = req.body

    if (!username || !password || !repeatPassword || !email) {
        return res.render("register", {
            title: "Register",
            username,
            email,
            data: req.body
        })
    }
    next();
}