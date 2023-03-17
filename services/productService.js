import { productData } from "../data/productData.js";
import { Cube } from "../models/cube.js";


export function getAll(query) {
    let result = productData.getProductData();

    if (query.search) {
        result = result.filter(x => x.name
            .toLocaleLowerCase()
            .includes(query.search))
    }

    if (query.from) {
        result = result.filter(x => Number(x.difficultyLevel) >= query.from);
    }

    if (query.to) {
        result = result.filter(x => Number(x.difficultyLevel) <= query.to);
    }
    return result
}

export function getById(id) {
    return productData.getById(id);
}

export function productService(data) {
    let cube = new Cube(Date.now(), data);
    return productData.create(cube);
}