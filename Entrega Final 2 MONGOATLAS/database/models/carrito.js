import mongoose from "mongoose";

const carritosCollection = "carritos";

const CarritoSchema = new mongoose.Schema({
  timestamp: { type: Date, require: true },
  productos: { type: Array, require: true },
});

export const carritos = mongoose.model(carritosCollection, CarritoSchema);
