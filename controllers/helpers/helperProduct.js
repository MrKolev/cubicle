export function validateProduct(req, res, next) {
    const { name, description, imageUrl } = req.body
    if (!name || !description || !imageUrl) {
        return res.render("create", {
            title: "Create",
            name: name,
            description: description,
            imageUrl: imageUrl,
            data: req.body
        })
    }
    next();
}