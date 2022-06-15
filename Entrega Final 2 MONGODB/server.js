// librerias y componentes
import express from "express";
import mongoose from "mongoose";
// Server
const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`HTTP Server listening in port:${server.address().port}`);
});

server.on(`error`, (error) => console.log(`Server error:${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
import { routerProducts } from "./controllers/productsRouter.js";
app.use(`/api/productos`, routerProducts);

import routerCart from "./controllers/cartRouter.js";
app.use(`/api/carrito`, routerCart);

// statics
app.use(express.static(`public`));

//middlewares
app.use(function (req, res) {
  res.status(404).json({
    error: -2,
    description: `ruta no implementada`,
    path: req.path,
    method: req.method,
  });
});

// DB connection

const URL = "mongodb://localhost:27017/ecommerce";
connect();
async function connect() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conexion a la DB ${URL} establecida`);
  } catch (error) {
    throw new Error(`Hubo un error al conectarse a ${URL}: ${error}`);
  }
}

// requests
app.get(`/`, (req, res) => {
  res.status(200).sendFile(`index.html`);
});
