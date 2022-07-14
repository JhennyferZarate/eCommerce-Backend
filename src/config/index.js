import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const config = {
  FILESYSTEM_DB: {
    products: "productos",
    shoppingCart: "carrito",
  },
  server: {
    PORT: process.env.PORT || DEV_PORT,
    routes: {
      base: "/api",
      products: "/api/productos",
      shoppingCart: "/api/carrito",
    },
  },
};

export { config };