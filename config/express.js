import { engine } from 'express-handlebars';
import express from "express";


export function setupExpress(app) {
    app.engine('hbs', engine({
        extname: "hbs"
    }));
    app.set('view engine', 'hbs');
    app.use(express.static("public"));

    app.use(express.urlencoded({extended:true}))

}