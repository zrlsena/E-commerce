const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
const EmployeeModel = require("./models/Employee"); // Admin modelini import et

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 📌 Register Endpoint (Admin Kaydetme)
app.post('/register', async (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
});

app.post('/login', (req, res) => {
  const{email, password} = req.body;
  EmployeeModel.findOne ({email: email})
  .then(user => {
    if(user) {
      if(user.password === password){
        res.json("Success")
      } else {
        res.json("the password is incorrect")
      }
    } else {
      res.json("no record existed")
    }
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
