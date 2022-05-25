// librerias y componentes
const express = require(`express`);

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
const { routerProducts } = require(`./controllers/productsRouter`);
app.use(`/api/productos`, routerProducts);

const { routerCart } = require(`./controllers/cartRouter`);
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

// requests
app.get(`/`, (req, res) => {
  res.status(200).sendFile(`index.html`);
});
