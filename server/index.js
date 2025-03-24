const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const CustomerModel = require("./models/Customer");
const EmployeeModel = require("./models/Employee");


const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    // Eğer admin bilgileri ile giriş yapılıyorsa
    if (email === "sena@sena.com" && password === "sena") {
      return res.json({ message: "Admin Login Success", role: "admin" });
    }
  
    // Normal kullanıcı girişi
    CustomerModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            res.json({ message: "Success", role: "user" });
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("No record existed");
        }
      });
  });
  

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Aynı email ile kullanıcı var mı kontrol et
    const existingUser = await CustomerModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Yeni kullanıcı oluştur
    const newUser = await CustomerModel.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Yeni çalışan ekleme endpoint'i
app.post("/admin/add-employee", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingEmployee = await EmployeeModel.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newEmployee = await EmployeeModel.create({ name, email, password });
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Çalışanları listeleme endpoint'i
app.get("/admin/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Çalışan silme endpoint'i
app.delete("/admin/delete-employee/:id", async (req, res) => {
  try {
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
