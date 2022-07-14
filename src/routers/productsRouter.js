import { Router } from "express";
import { FilesystemContainer } from "../Api/FilesystemContainer.js";
import { config } from "../config/index.js";
import { isAdmin } from "../middlewares/index.js";
import { ERRORS_UTILS, JOI_VALIDATOR } from "../utils/index.js";

const productsRouter = Router();

const ProductApi = new FilesystemContainer(config.FILESYSTEM_DB.products);

//Admins and users
productsRouter.get("/", async (req, res) => {
    try {
        const products = await ProductApi.getAll();
        res.send(products);
    } catch (error) {
        res.send(error);
    }
});

//Admins and users
productsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductApi.getById(id);

        if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

        res.send(product);
    } catch (error) {
        res.send(error);
    }
});

//Admins only
productsRouter.post("/", isAdmin, async (req, res) => {
    try {
        const { name, description, code, thumbnail, price, stock } = req.body;

        const product = await JOI_VALIDATOR.product.validateAsync({
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
        });

        console.log(product);

        const productSaved = await ProductApi.save(product);
        console.log(productSaved);
        res.send(productSaved);
    } catch (error) {
        res.send(error);
    }
});

productsRouter.put("/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductApi.getById(id);

        if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

        const updatedProduct = await ProductApi.updateById(id, req.body);

        res.send(updatedProduct);
    } catch (error) {
        res.send(error);
    }
});

productsRouter.delete("/:id", isAdmin, async (req, res) => {
    try{
        const { id } = req.params;

        const product = await ProductApi.getById(id);
        if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

        const deletedProduct = await ProductApi.deleteById(id);

        res.send(deletedProduct);
    } catch (error) {
        res.send(error);
    }
});

export { productsRouter };