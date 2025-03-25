const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "employee" },
  phone: { type: String },
  description: { type: String, default: "" }, // Açıklama ekledik
  image: { type: String, default: "" }, // Profil fotoğrafı için ekledik
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
