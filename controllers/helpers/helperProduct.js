export function validateProductInput(req, res, next) {
    let { name, description, imageUrl } = req.body
    try {
        if (!name || name == " " || !description || description == " " || !imageUrl) {
            throw { message: 'All fields must be filled.' };
        }
        if (name.length < 2) {
            name = false;
            throw { message: 'Name must be at least 2 characters.' };
        };
        if (description.length < 2) {
            description = false;
            throw { message: 'Description must be at least 2 characters.' };
        };
        if (!(/^https?/.test(imageUrl))) {
            imageUrl = false;
            throw { message: 'Image URL must be a valid.' };
        };

        next();

    } catch (error) {
        const from = req.params.from;
        const data = req.body;
        data._id = req.params.productId;
        return res.render(from, {
            title: from,
            name,
            description,
            imageUrl,
            data,
            error
        })
    }


}