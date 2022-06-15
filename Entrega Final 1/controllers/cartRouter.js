// Librerias y componentes
const express = require(`express`);
const { Router } = require(`express`);
const Cart = require(`../models/cartConstructor`);
const { productos } = require(`./productsRouter`);

// declaramos router
const routerCart = new Router();

routerCart.use(express.urlencoded({ extended: true }));
routerCart.use(express.json());

// instanciamos la base de productos
const cart = new Cart(`./database/carritos.json`);

// requests
routerCart.post(`/`, (req, res) => {
  const newCart = cart.newCart(productos.getById(req.body.id)); //recibe el id del primer producto que se agrega y que dispara la creacion del carrito
  res.status(200).json(newCart);
});

routerCart.delete(`/:id`, (req, res) => {
  cart.deleteCart(req.params.id);
  res.status(200).redirect(`/`);
});

routerCart.get(`/:id/productos`, (req, res) => {
  const productsInCart = cart.getCartProducts(req.params.id);
  res.status(200).json(productsInCart);
});

routerCart.post(`/:id/productos`, (req, res) => {
  const productAdd = cart.addToCart(
    req.params.id,
    productos.getById(req.body.id)
  ); //recibe el id del producto que se agrega
  res.status(200).redirect(`productos`);
});

routerCart.delete(`/:id/productos/:id_prod`, (req, res) => {
  const productDelete = cart.deleteCartProduct(
    req.params.id,
    req.params.id_prod
  );
  res
    .status(200)
    .json({
      status: `ok`,
      description: `remove product id:${req.params.id_prod} from cart id:${req.params.id}`,
    });
});

module.exports = { routerCart: routerCart, cart: cart };
