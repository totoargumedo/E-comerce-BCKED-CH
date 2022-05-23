// Librerias y componentes
const express = require(`express`);
const { Router } = require(`express`);
const Cart = require(`../models/cartConstructor`);

// declaramos router
const routerCart = new Router();

routerCart.use(express.urlencoded({ extended: true }));
routerCart.use(express.json());

// instanciamos la base de productos
const cart = new Cart(`./database/carritos.json`);

module.exports = routerCart;
