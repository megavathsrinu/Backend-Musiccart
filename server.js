const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ProductsDb = require("./Models/ProductModel");
const cors = require("cors");

require("dotenv").config();

// create a express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log(process.env.MONGO_URL);

// Connect to mongodb using mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.status(200).json("Server is up and running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const productsRoutes = require("./routes/ProductRoutes");
const authenticationRoutes = require("./routes/Authentication");
const cartRoutes = require("./routes/CartRoutes");

// Middlewares
app.use("/api/products", productsRoutes);
app.use("/api", authenticationRoutes);
app.use("/api", cartRoutes);
