const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
const EmployeeModel = require("./models/Employee"); 
const ProductModel = require("./models/Product"); 


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.post('/register', async (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          // Admin kontrolü backend'de yapılabilir
          if (email === "admin@admin.com" && password === "admin123") {
            res.json({ message: "admin" });
          } else {
            res.json({ message: "user" });
          }
        } else {
          res.json("The password is incorrect"); // Şifre hatalı
        }
      } else {
        res.json("No record existed"); // Kullanıcı bulunamadı
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


app.post("/admin/products", async (req, res) => {
  try {
      const newProduct = new ProductModel(req.body);
      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
      res.status(500).json({ error: "Server error",err });
  }
});

app.get("/admin/products", async (req, res) => {
  try {
      const products = await ProductModel.find();
      res.json(products);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put("/admin/products/:id", async (req, res) => {
  try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.delete("/admin/products/:id", async (req, res) => {
  try {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully!" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
