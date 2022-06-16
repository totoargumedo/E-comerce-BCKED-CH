// librerias

const fs = require(`fs`);

// clase productos
class Productos {
  constructor(filePath) {
    this.id = 0;
    this.filePath = filePath;
    this.fileContent = [];
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

  saveProduct(product) {
    this.id++;
    const newProduct = { ...product, id: this.id, timestamp: Date.now() };
    this.fileContent.push(newProduct);
    this.write(this.fileContent);
    return newProduct;
  }

  modify(id, product) {
    const productIndex = this.fileContent.indexOf(
      this.fileContent.find((prod) => prod.id == id)
    );
    if (productIndex === -1) {
      throw new Error(`El producto solicitado no existe`);
    }

    this.fileContent[productIndex].name = product.name
      ? product.name
      : this.fileContent[productIndex].name;
    this.fileContent[productIndex].description = product.description
      ? product.description
      : this.fileContent[productIndex].description;
    this.fileContent[productIndex].price = product.price
      ? product.price
      : this.fileContent[productIndex].price;
    this.fileContent[productIndex].code = product.code
      ? product.code
      : this.fileContent[productIndex].code;
    this.fileContent[productIndex].photo = product.photo
      ? product.photo
      : this.fileContent[productIndex].photo;
    this.fileContent[productIndex].stock = product.stock
      ? product.stock
      : this.fileContent[productIndex].stock;
    this.fileContent[productIndex].timestamp = Date.now();

    this.write(this.fileContent);
    return this.fileContent[productIndex];
  }

  modifyStock(id, stock) {
    const productIndex = this.fileContent.indexOf(
      this.fileContent.find((prod) => prod.id == id)
    );
    if (productIndex == -1) {
      throw new Error(`Producto no encontrado`);
    }
    this.fileContent[productIndex].stock = stock;
    return this.fileContent[productIndex].stock;
  }

  getAll() {
    return this.fileContent;
  }

  getById(id) {
    const productById = this.fileContent.find((prod) => prod.id == id);
    if (productById === undefined) {
      throw new Error(`Producto no encontrado`);
    }
    return productById;
  }

  deleteById(id) {
    const productIndex = this.fileContent.indexOf(
      this.fileContent.find((prod) => prod.id == id)
    );
    const deletedProduct = this.fileContent[productIndex];
    if (deletedProduct === undefined) {
      throw new Error(`Producto no encontrado`);
    }
    this.fileContent.splice(productIndex, 1);
    this.write(this.fileContent);
    return deletedProduct;
  }

  deleteAll() {
    this.write([]);
    console.log(`The ${this.filePath} database has been cleared`);
  }
}

module.exports = Productos;
