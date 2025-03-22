const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 1 },
    image: { type: String }, 
}, { timestamps: true });

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
