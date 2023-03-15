import express from "express";
import { config } from "./config/config.js";
import { engine } from 'express-handlebars';

const app = express();
app.engine('hbs', engine());
app.set('view engine', 'hbs');

app.use(express.static("public"))
app.get("/", (req, res) => {
    res.render("home", {layout: false})
});

app.listen(config.PORT, ()=> console.log(`Server is running on port:${config.PORT}...`));