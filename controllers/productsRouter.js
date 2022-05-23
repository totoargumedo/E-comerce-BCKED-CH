// Librerias y componentes
const express = require(`express`);
const { Router } = require(`express`);
const Productos = require(`../models/productsConstructor`);

// declaramos router
const routerProducts = new Router();

routerProducts.use(express.urlencoded({ extended: true }));
routerProducts.use(express.json());

// instanciamos la base de productos
const productos = new Productos(`./database/productos.json`);

routerProducts.get(`/:id?`, (req, res) => {
  if (req.params.id) {
    const product = productos.getById(req.params.id);
    res.status(200).json(product);
  } else {
    const products = productos.getAll();
    res.status(200).json(products);
  }
});

routerProducts.post(`/`, (req, res) => {
  const newProduct = productos.saveProduct(req.body);
  res.status(200).json(newProduct);
});

routerProducts.put(`/:id`, (req, res) => {
  const modifiedProduct = productos.modify(req.params.id, req.body);
  res.status(200).json(modifiedProduct);
});

routerProducts.delete(`/:id`, (req, res) => {
  const deletedProduct = productos.deleteById(req.params.id);
  res.status(200).json(deletedProduct);
});

module.exports = routerProducts;
