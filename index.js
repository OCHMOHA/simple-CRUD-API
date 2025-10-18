const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("whats up bitch hh");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products); // get request for all orders
  } catch (error) {
    res.status(500).json({ message: error.message }); //err
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params; // get request for order by id
    const product = await Product.findById(id); // search and retreive the order by id
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message }); // err
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//del product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://ALIEXN:minou@backdb.iwteqwx.mongodb.net/Node-api?retryWrites=true&w=majority&appName=Backdb"
  )
  .then(() => {
    console.log("Connected to the db");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
