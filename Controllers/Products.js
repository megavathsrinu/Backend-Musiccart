const ProductModel = require("../Models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const queryObject = {};

    const {
      brand,
      type,
      color,
      price,
      sort,
      minPrice,
      maxPrice,
      featured,
      searchItem,
    } = req.query;

    if (searchItem) {
      queryObject.name = searchItem;
    }

    if (brand) {
      queryObject.brand = { $regex: brand, $options: "ix" };
    }

    if (type) {
      queryObject.type = { $regex: type, $options: "i" };
    }

    if (color) {
      queryObject.color = { $regex: color, $options: "ix" };
    }

    if (featured) {
      queryObject.featured = featured;
    }

    if (price) {
      queryObject.price = { $regex: price, $options: "ix" };
    }

    if (minPrice && maxPrice) {
      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return res.status(400).json({ error: "Invalid price range" });
      }
      queryObject.price = { $gte: minPrice, $lte: maxPrice };
    }

    let apiData = await ProductModel.find(queryObject);

    if (sort) {
      if (sort == "name_asc") {
        apiData = await ProductModel.find(queryObject)
          .collation({ locale: "en", strength: 2 })
          .sort({ name: 1 });
      } else if (sort == "name_des") {
        apiData = await ProductModel.find(queryObject)
          .collation({ locale: "en", strength: 2 })
          .sort({ name: -1 });
      } else if (sort == "featured") {
        apiData = await ProductModel.find(queryObject).sort({ featured: -1 });
      } else {
        apiData = await ProductModel.find(queryObject).sort(sort);
      }
    }

    const data = apiData;
    res.status(200).json({ data, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSelectedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await ProductModel.findById(id);
    if (productDetails) {
      res.json({
        success: true,
        message: "product details fetched successfully",
        data: productDetails,
      });
    } else {
      res.json({ success: false, message: "No such data found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getSelectedProduct };
