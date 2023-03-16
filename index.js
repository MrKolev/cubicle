import express from "express";
import { config } from "./config/config.js";
import { setupExpress } from "./config/express.js";
import { routers } from "./routes.js";


const app = express();
setupExpress(app);
app.use(routers);


app.listen(config.PORT, ()=> console.log(`Server is running on port:${config.PORT}...`));