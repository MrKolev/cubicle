import { Accessory } from "../models/accessory.js";


function create(data) {
    let accessory = Accessory(data);
    return accessory.save();
}
function getAll() {
    return Accessory.find({}).lean()
}
function getNameAndId(ids) {
    return Accessory.find({_id: {$nin: ids}},{name:1}).lean()
}


export const accessoriesServer = {
    create,
    getAll,
    getNameAndId
}


