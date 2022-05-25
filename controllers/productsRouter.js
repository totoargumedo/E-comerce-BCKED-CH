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

// admin options

let administrador = true;

// requests

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
  if (administrador) {
    const newProduct = productos.saveProduct(req.body);
    res.status(200).json(newProduct);
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `carga de datos sin permiso`,
      ruta: req.path,
      método: req.method,
    });
  }
});

routerProducts.put(`/:id`, (req, res) => {
  if (administrador) {
    const modifiedProduct = productos.modify(req.params.id, req.body);
    res.status(200).json(modifiedProduct);
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `actualización de datos sin permiso`,
      ruta: `api/productos/${req.params.id}`,
      método: `PUT`,
    });
  }
});

routerProducts.delete(`/:id`, (req, res) => {
  if (administrador) {
    const deletedProduct = productos.deleteById(req.params.id);
    res.status(200).json(deletedProduct);
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `eliminación de datos sin permiso`,
      ruta: `api/productos/${req.params.id}`,
      método: `DELETE`,
    });
  }
});

module.exports = { routerProducts: routerProducts, productos: productos };
