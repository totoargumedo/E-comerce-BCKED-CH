// librerias
import * as productosModel from "../database/models/producto.js";
import queryProductos from "../database/models/producto.js";

// clase productos
class Productos {
  constructor(URL) {
    this.URL = URL;
  }

  async saveProduct(product) {
    const newProduct = { ...product, timestamp: Date.now() };
    let doc = queryProductos.doc();
    return await doc.create(newProduct);
  }

  async modify(id, product) {
    const productFind = await productosModel.productos.findByIdAndUpdate(
      { _id: id },
      product
    );
    return productFind;
  }

  async modifyStock(id, stock) {
    const productFind = await productosModel.productos.findByIdAndUpdate(
      { _id: id },
      { $set: { stock: stock } }
    );
    return productFind;
  }

  async getAll() {
    return await productosModel.productos.find({});
  }

  async getById(id) {
    return await productosModel.productos.find({ _id: id });
  }

  async deleteById(id) {
    const productFind = await productosModel.productos.findByIdAndDelete({
      _id: id,
    });

    return productFind;
  }

  async deleteAll() {
    return await productosModel.productos.deleteMany({});
  }
}

export default Productos;
