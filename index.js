import express from "express";
import { config } from "./config/config.js";
import { setupExpress } from "./config/express.js";


const app = express();
setupExpress(app);

app.listen(config.PORT, ()=> console.log(`Server is running on port:${config.PORT}...`));