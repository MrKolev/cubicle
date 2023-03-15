import express from "express";
import { config } from "./config/config.js";

const app = express();

app.listen(config.PORT, ()=> console.log(`Server is running on port:${config.PORT}...`));