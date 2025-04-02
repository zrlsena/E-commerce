const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  buttonText: { type: String },
  buttonLink: { type: String },
},{ timestamps: true });

const Slide = mongoose.model("Slide", SlideSchema);
module.exports = Slide;
