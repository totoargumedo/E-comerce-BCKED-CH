// Librerias y componentes
import express from "express";
import { Router } from "express";
import Cart from "../models/cartConstructor.js";
import { productos } from "./productsRouter.js";

// declaramos router
const routerCart = new Router();

routerCart.use(express.urlencoded({ extended: true }));
routerCart.use(express.json());

// instanciamos la base de productos
const cart = new Cart("mongodb://localhost:27017/ecommerce");

// admin options

let administrador = false;

// requests
routerCart.get("/", (req, res) => {
  if (administrador) {
    cart.getCarts().then((data) => {
      res.status(200).json({ carts: data });
    });
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `carga de datos sin permiso`,
      ruta: req.path,
      método: req.method,
    });
  }
});

routerCart.post(`/`, (req, res) => {
  cart.newCart().then((data) => {
    res.status(200).json({ message: "Nuevo carrito creado", id: data._id });
  });
});

routerCart.delete(`/:id`, (req, res) => {
  cart
    .deleteCart(req.params.id)
    .then((data) => {
      res.status(200).redirect(`/`);
    })
    .catch((err) => {
      throw new Error({ error: err });
    });
});

routerCart.get(`/:id/productos`, (req, res) => {
  cart.getCartProducts(req.params.id).then((data) => {
    res.status(200).json(data);
  });
});

routerCart.post(`/:id/productos`, (req, res) => {
  productos
    .getById(req.body.id)
    .then((data) => {
      return data;
    })
    .then((data) => {
      cart.addToCart(req.params.id, data);
    })
    .then((data) => {
      res.status(200).redirect(`productos`);
    })
    .catch((err) => {
      throw new Error({ error: err });
    });
});

routerCart.delete(`/:id/productos/:id_prod`, (req, res) => {
  cart
    .deleteCartProduct(req.params.id, req.params.id_prod)
    .then((data) => {
      res.status(200).json({
        status: `ok`,
        description: `remove product id:${req.params.id_prod} from cart id:${req.params.id}`,
      });
    })
    .catch((err) => {
      throw new Error({ error: err });
    });
});

export default routerCart;
