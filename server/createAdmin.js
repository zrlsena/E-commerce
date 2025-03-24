const mongoose = require("mongoose");
const CustomerModel = require("./models/CustomerModel"); // Modeli import et

mongoose.connect("mongodb+srv://zrlsena:cnblue04@zrlsena.ns9kn.mongodb.net/?retryWrites=true&w=majority&appName=zrlsena", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function createAdmin() {
  const admin = new CustomerModel({
    name: "Admin User",
    email: "admin@example.com",
    password: "adminpassword",
    role: "admin",
  });

  await admin.save();
  console.log("✅ Admin kullanıcısı oluşturuldu!");
  mongoose.connection.close();
}

createAdmin();
