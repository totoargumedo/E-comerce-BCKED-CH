// import mongoose from "mongoose";

// const productosCollection = "productos";

// const ProductoSchema = new mongoose.Schema({
//   nombre: { type: String, require: true },
//   descripcion: { type: String, require: true, max: 140 },
//   codigo: { type: String, require: true, unique: true },
//   foto: { type: String, require: true },
//   precio: { type: Number, require: true },
//   stock: { type: Number, require: true },
//   timestamp: { type: Date, require: true },
// });

// export const productos = mongoose.model(productosCollection, ProductoSchema);

import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./database/ecommerce-bkendch-firebase-adminsdk-qpqle-0a802d3b94.json",
    "utf-8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log(`Conexion a la DB Firebase establecida`);
const db = admin.firestore();
const queryProductos = db.collection("productos");
const queryCarritos = db.collection("carritos");

export default queryProductos;
