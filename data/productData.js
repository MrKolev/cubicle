import * as fs from 'node:fs/promises';
import productsBD from "../config/dbProducts.json" assert { type: "json" }

function create(product) {
    productsBD.push(product);
    return fs.writeFile(
        "./config/dbProducts.json",
        JSON.stringify(productsBD)
    )
}

function getProductData() {
    return productsBD
}

function getById(id) {
    return productsBD.find(x => x.id == id)
}

export const productData = {
    create,
    getProductData,
    getById
}