// libreriras y modulos

const fs = require(`fs`);

class Cart {
  constructor(filePath) {
    this.filePath = filePath;
    this.fileContent = [];
    this.id = 0;
    this.read();
  }

  async read() {
    try {
      const readContent = await fs.promises.readFile(this.filePath, `utf-8`);
      this.fileContent = JSON.parse(readContent);
      if (this.fileContent.length >= 1) {
        this.id = this.fileContent[this.fileContent.length - 1].id;
      }
      console.log(`The ${this.filePath} database has been loaded into memory`);
    } catch (error) {
      await this.write([]);
      console.log(`The ${this.filePath} database has been created anew`);
      throw new Error(`Hubo un error al cargar ${this.filePath}: ${error}`);
    }
  }

  async write(contentToSave) {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(contentToSave));
      console.log(`The ${this.filePath} database has been updated`);
    } catch (error) {
      throw new Error(`Hubo un error al guardar ${this.filePath}: ${error}`);
    }
  }

  newCart(product) {
    this.id++;
    const newCart = {
      id: this.id,
      timestamp: Date.now(),
      products: [product],
    };
    this.fileContent.push(newCart);
    this.write(this.fileContent);
    return newCart.id;
  }

  addToCart(id, productById) {
    const cartIndex = this.fileContent.indexOf(
      this.fileContent.find((cart) => cart.id == id)
    );
    if (cartIndex === -1) {
      throw new Error(`Nose puede agregar, el carrito no existe`);
    }
    this.fileContent[cartIndex].products.push(productById);
    this.write(this.fileContent);
    return this.fileContent[cartIndex].id;
  }

  getCartProducts(id) {
    const cartIndex = this.fileContent.indexOf(
      this.fileContent.find((cart) => cart.id == id)
    );
    if (cartIndex === -1) {
      throw new Error(`El carrito no existe`);
    }
    return this.fileContent[cartIndex].products;
  }

  deleteCart(id) {
    const cartIndex = this.fileContent.indexOf(
      this.fileContent.find((cart) => cart.id == id)
    );
    if (cartIndex === -1) {
      throw new Error(`El carrito no existe`);
    }
    this.fileContent.splice(cartIndex, 1);
    this.write();
  }

  deleteCartProduct(cartId, productId) {
    const cartIndex = this.fileContent.indexOf(
      this.fileContent.find((cart) => cart.id == cartId)
    );
    const productIndex = this.fileContent[cartIndex].products.indexOf(
      this.fileContent[cartIndex].products.find((prod) => prod.id == productId)
    );
    if (cartIndex === -1) {
      throw new Error(`El carrito no existe`);
    }
    this.fileContent[cartIndex].products.splice(productIndex, 1);
    this.write(this.fileContent);
    return cartId;
  }
}
module.exports = Cart;
