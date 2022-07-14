//call all the required packages
import express from "express";
import { config } from "./config/index.js";
import { productsRouter, shoppingCartRouter } from "./routers/index.js";

//create express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.shoppingCart, shoppingCartRouter);


//listen to server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${server.address().port}`)
});

//error handling
server.on('error', error => console.log(`Server error ${error}`));