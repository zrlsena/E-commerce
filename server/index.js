const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const CustomerModel = require("./models/Customer");
const EmployeeModel = require("./models/Employee");
const ProductModel = require("./models/Product");
const SlideModel = require("./models/Slide");

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

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Eğer admin giriş yapıyorsa
    if (email === "sena@sena.com" && password === "sena") {
        return res.json({ message: "Admin Login Success", role: "admin" });
    }

    try {
        // Çalışan kontrolü
        const employee = await EmployeeModel.findOne({ email: email });
        if (employee) {
            if (employee.password === password) {
                return res.json({ 
                    message: "Employee Login Success", 
                    role: "employee",
                    employeeId: employee._id  
                });
            } else {
                return res.status(400).json({ message: "Incorrect password for employee" });
            }
        }

        // Kullanıcı kontrolü
        const user = await CustomerModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                return res.json({ message: "User Login Success", role: "user" });
            } else {
                return res.status(400).json({ message: "Incorrect password for user" });
            }
        }

        return res.status(404).json({ message: "No user found" });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
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

app.post("/employee/add-product", async (req, res) => {
  const { name, description, price, stock, image, employeeId } = req.body;

  if (!name || !description || !price || !stock || !image || !employeeId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = await ProductModel.create({ name, description, price, stock, image, employeeId });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// 🔥 Employee: Update a product
app.put("/employee/update-product/:id", async (req, res) => {
  const { name, description, price, stock, image } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, image },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Employee: Delete a product
app.delete("/employee/delete-product/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Tüm ürünleri listeleme
app.get("/products", async (req, res) => {
  try {
    const { employeeId } = req.query;

    let query = {}; // Eğer employeeId varsa filtre uygula
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const products = await ProductModel.find(query).populate("employeeId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// 🔥 Employee: Update own profile information
app.put("/employee/update-profile/:id", async (req, res) => {
  const {  name, email, phone, description, image } = req.body;

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      {  name, email, phone, description, image },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Fetch employee profile by ID
app.get("/employee/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id).select(
      "name email role phone description image"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔥 Tek bir ürünü getirme (Details sayfası için)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate("employeeId", "name");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/employee/name/:name", async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne({ name: req.params.name });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});
app.post("/admin/add-slide", async (req, res) => {
  const { imageUrl, title, description, buttonText, buttonLink  } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const newSlide = await SlideModel.create({ imageUrl, title, description, buttonText, buttonLink  });
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});
app.get("/slides", async (req, res) => {
  try {
    const slides = await SlideModel.find().sort({ createdAt: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});
app.delete("/admin/delete-slide/:id", async (req, res) => {
  try {
    await SlideModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Slide deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
