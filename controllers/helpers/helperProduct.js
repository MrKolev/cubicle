export function validateProductInput(req, res, next) {
    const { name, description, imageUrl } = req.body
    
    if (!name || !description || !imageUrl) {
        const _id = req.params.productId
        const from = req.params.from
        const data = {_id, name, description, imageUrl }
        return res.render(from, {
            title: from,
            name: name,
            description: description,
            imageUrl: imageUrl,
            data
        })
    }
    next();
}