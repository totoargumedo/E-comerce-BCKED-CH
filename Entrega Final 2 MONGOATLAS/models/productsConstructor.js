// librerias
import mongoose from "mongoose";
import * as productosModel from "../database/models/producto.js";

// clase productos
class Productos {
  constructor(URL) {
    this.URL = URL;
    this.collection = productosModel;
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(this.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Conexion a la DB ${this.URL} establecida`);
    } catch (error) {
      throw new Error(`Hubo un error al conectarse a ${this.URL}: ${error}`);
    }
  }

  disconnect() {
    mongoose.disconnect();
    console.log(`DB ${this.URL} desconectada con exito`);
  }

  async saveProduct(product) {
    const newProduct = { ...product, timestamp: Date.now() };
    return await this.collection.productos.create(newProduct);
  }

  async modify(id, product) {
    const productFind = await this.collection.productos.findByIdAndUpdate(
      { _id: id },
      product
    );
    return productFind;
  }

  async modifyStock(id, stock) {
    const productFind = await this.collection.productos.findByIdAndUpdate(
      { _id: id },
      { $set: { stock: stock } }
    );
    return productFind;
  }

  async getAll() {
    return await this.collection.productos.find({});
  }

  async getById(id) {
    return await this.collection.productos.find({ _id: id });
  }

  async deleteById(id) {
    const productFind = await this.collection.productos.findByIdAndDelete({
      _id: id,
    });

    return productFind;
  }

  async deleteAll() {
    return await this.collection.productos.deleteMany({});
  }
}

export default Productos;
