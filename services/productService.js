import {Cube} from  "../models/cube.js"


function create(data) {
    let cube = Cube(data);
    return cube.save();
}

export const productsServer = {
    create
}