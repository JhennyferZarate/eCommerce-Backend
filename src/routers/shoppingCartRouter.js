import { Router } from "express";
import { FilesystemContainer } from "../Api/FilesystemContainer.js";
import { config } from "../config/index.js";
import { ERRORS_UTILS } from "../utils/index.js";

const shoppingCartRouter = Router();

const ShoppingCartApi = new FilesystemContainer(config.FILESYSTEM_DB.shoppingCart);
const ProductsApi = new FilesystemContainer(config.FILESYSTEM_DB.products);

const BASE_CART = {
    products: [],
};

//Create a new shopping cart
shoppingCartRouter.post("/", async (req, res) => {
    try {
        const shoppingCart = await ShoppingCartApi.save(BASE_CART);
        const shoppingCartId = shoppingCart.id;
        res.send({ id: shoppingCartId });
    } catch (error) {
        res.send(error);
    }
});

//Incorporate a product to a shopping cart
shoppingCartRouter.post("/:id/productos", async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.body;

        const shoppingCart = await ShoppingCartApi.getById(id);

        if (!shoppingCart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

        const product = await ProductsApi.getById(productId);

        if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

        shoppingCart.products.push(product);
        console.log(shoppingCart.products);

        const updatedShoppingCart = await ShoppingCartApi.updateById(id, shoppingCart);

        res.send(updatedShoppingCart);
    } catch (error) {
        res.send(error);
    }
});

//Get the shopping cart by id
shoppingCartRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const shoppingCart = await ShoppingCartApi.getById(id);

        if (!shoppingCart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

        res.send(shoppingCart);
    } catch (error) {
        res.send(error);
    }
});

//delete shopping cart
shoppingCartRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const shoppingCart = await ShoppingCartApi.getById(id);

        if (!shoppingCart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

        const deletedShoppingCart = await ShoppingCartApi.deleteById(id);

        res.send(deletedShoppingCart);
    } catch (error) {
        res.send(error);
    }
});

//delete a product from a shopping cart
shoppingCartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    try {
        const { id, id_prod  } = req.params;
        const shoppingCart = await ShoppingCartApi.getById(id);

        if (!shoppingCart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

        const product = await ProductsApi.getById(id_prod);

        if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

        const index = shoppingCart.products.findIndex(prod => prod.id === product.id);

        if(index != 1){
            shoppingCart.products = shoppingCart.products.slice(index, 1);

            const updatedShoppingCart = await ShoppingCartApi.updateById(id, shoppingCart);

            res.send(updatedShoppingCart);
        }else{
            res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
        }

    } catch (error) {
        res.send(error);
    }
});

export { shoppingCartRouter };