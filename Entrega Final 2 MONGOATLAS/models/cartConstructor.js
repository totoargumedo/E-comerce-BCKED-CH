// libreriras y modulos

import mongoose from "mongoose";
import * as cartModel from "../database/models/carrito.js";

class Cart {
  constructor(URL) {
    this.URL = URL;
    this.collection = cartModel;
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

  async disconnect() {
    await mongoose.disconnect();
    console.log(`DB ${this.URL} desconectada con exito`);
  }

  async newCart() {
    const newCart = {
      timestamp: Date.now(),
      productos: [],
    };
    return await this.collection.carritos.create(newCart);
  }

  async addToCart(id, productById) {
    const cartFind = await this.collection.carritos.findByIdAndUpdate(
      { _id: id },
      { $push: { productos: productById } }
    );
    return cartFind;
  }

  async getCarts() {
    return await this.collection.carritos.find({});
  }

  async getCartProducts(id) {
    return await this.collection.carritos.find(
      { _id: id },
      { _id: 0, productos: 1 }
    );
  }

  async deleteCart(id) {
    return await this.collection.carritos.findByIdAndDelete({ _id: id });
  }

  async deleteCartProduct(cartId, productId) {
    const cartFind = await this.collection.carritos.findByIdAndUpdate(
      { _id: cartId },
      { $pull: { _id: productId } }
    );
    return cartFind;
  }
}

export default Cart;
