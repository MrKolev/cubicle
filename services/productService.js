import { Accessory } from "../models/accessory.js";
import { Cube } from "../models/cube.js"

function create(data) {
    let cube = Cube(data);
    return cube.save();
}

function getById(id) {
    return Cube.findById(id).lean();
}
function getByIdWithAccessory(id) {
    return Cube.findById(id)
        .populate("accessories")
        .lean();
}

async function getAll(query) {
    let products = null;
    if (query.from || query.to) {
        products = await Cube.find({ difficultyLevel: { $gte: query.from, $lte: query.to } }).lean();
    } else {
        products = await Cube.find({}).lean();
    }

    if (query.search) products = products.filter(x => x.name.includes(query.search))
    return products
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId)
    let accessory = await Accessory.findById(accessoryId.accessory);
    product.accessories.push(accessory);
    return product.save();
}

async function deleteAccessory(accerID, productId) {
    let product = await Cube.findById(productId);
    product.accessories = product.accessories.filter((x) => x._id != accerID);
    return product.save();
}

async function updateOne(productId, data){
   return Cube.updateOne({_id: productId}, data)
}


export const productsServer = {
    create,
    getAll,
    getById,
    attachAccessory,
    getByIdWithAccessory,
    deleteAccessory,
    updateOne
}