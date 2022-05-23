// librerias y componentes
const express = require(`express`);

// Server
const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`HTTP Server listening in port:${server.address().port}`);
});

server.on(`error`, (error) => console.log(`Server error:${error}`));

// routers
app.use(`/api/productos`, require(`./controllers/productsRouter`));
app.use(`/api/carrito`, require(`./controllers/cartRouter`));

// statics
app.use(express.static(`public`));

// requests
app.get(`/`, (req, res) => {
  res.sendFile(`index.html`);
});

// admin options

let administrador = false;
