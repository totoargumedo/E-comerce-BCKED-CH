// Librerias y componentes
import express from "express";
import { Router } from "express";
import Productos from "../models/productsConstructor.js";

// declaramos router
const routerProducts = new Router();

routerProducts.use(express.urlencoded({ extended: true }));
routerProducts.use(express.json());

// instanciamos la base de productos
const productos = new Productos("mongodb://localhost:27017/ecommerce");

// admin options

let administrador = true;

// requests

routerProducts.get(`/:id?`, (req, res) => {
  if (req.params.id) {
    productos
      .getById(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        throw new Error({ error: err });
      });
  } else {
    productos
      .getAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        throw new Error({ error: err });
      });
  }
});

routerProducts.post(`/`, (req, res) => {
  if (administrador) {
    productos
      .saveProduct(req.body)
      .then((newProduct) => {
        res.status(200).json({
          message: "Producto agregado correctamente",
          producto: newProduct,
        });
      })
      .catch((err) => {
        throw new Error({ error: err });
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

routerProducts.put(`/:id`, (req, res) => {
  if (administrador) {
    if (req.query.stock) {
      productos
        .modifyStock(req.params.id, req.query.stock)
        .then((data) => {
          res.status(200).json({
            message: `Producto con id:${req.params.id} stock actualizado correctamente`,
            newStock: req.query.stock,
          });
        })
        .catch((err) => {
          throw new Error({ error: err });
        });
    } else {
      productos
        .modify(req.params.id, req.body)
        .then((data) => {
          res.status(200).json({
            message: `Producto con id:${req.params.id} actualizado correctamente`,
            oldProduct: data,
            newData: req.body,
          });
        })
        .catch((err) => {
          throw new Error({ error: err });
        });
    }
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `actualización de datos sin permiso`,
      ruta: `api/productos/${req.params.id}`,
      método: req.method,
    });
  }
});

routerProducts.delete(`/:id`, (req, res) => {
  if (administrador) {
    productos
      .deleteById(req.params.id)
      .then((data) => {
        res.status(200).json({
          message: `Producto con id:${req.params.id} eliminado correctamente`,
          product: data,
        });
      })
      .catch((err) => {
        throw new Error({ error: err });
      });
  } else {
    res.status(401).json({
      error: new Error(`Acceso no autorizado`),
      descripcion: `eliminación de datos sin permiso`,
      ruta: `api/productos/${req.params.id}`,
      método: req.method,
    });
  }
});

export { routerProducts, productos };
