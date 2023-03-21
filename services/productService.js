import { Accessory } from "../models/accessory.js";
import { Cube } from "../models/cube.js"

function create(data) {
    let cube = Cube(data);
    return cube.save();
}

function getById(id) {
    return Cube.findById(id).lean();
}

function getAll(query) {
    if (query.search) {
        return Cube.find({ name: query.search }).lean();
    }
    if (query.from) {
        return Cube.find({ difficultyLevel: { $gte: query.from } }).lean()
    }
    if (query.to) {
        return Cube.find({ difficultyLevel: { $lte: query.to } }).lean()
    }
    return Cube.find({}).lean();

}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId)
    let accessory = await Accessory.findById(accessoryId.accessory);
    product.accessories.push(accessory);
    return product.save();
}


export const productsServer = {
    create,
    getAll,
    getById,
    attachAccessory
}