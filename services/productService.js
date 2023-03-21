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

export const productsServer = {
    create,
    getAll,
    getById
}