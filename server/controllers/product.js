const Product = require("../models/product");
const slugify = require("slugify");

//CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({
        success: false,
        message: "Missing inputs",
      });
    }

    if (req.body && req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Cannot create new product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Product.findById(pid);
    return res.status(200).json({
      success: product ? true : false,
      productData: product ? product : "Cannot get product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET ALL PRODUCT
//FILTERING, SORTING & PAGINATION
const getProducts = async (req, res) => {
  try {
    const queries = { ...req.query };
    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((item) => delete queries[item]);

    //Format lại các operators cho đúng cứ pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formatedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.title) {
      formatedQueries.title = { $regex: queries.title, $options: "i" };
    }
    let queryCommand = Product.find(formatedQueries);

    //Sorting
    if (req.query.sort) {
      //abc,efg => [abc,efg] => abc efg
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limit

    //Pagination

    //Execute query
    //Số lượng sp thỏa mãn diều kiện !== số lượng sp trả về 1 lần gọi API
    queryCommand
      .then(async (response) => {
        const counts = await Product.find(formatedQueries).countDocuments();

        return res.status(200).json({
          success: response ? true : false,
          products: response ? response : "Cannot get products",
          counts,
        });
      })
      .catch((err) => {
        return res.status(401).json({ success: false, message: err.message });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (req.body && req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: updatedProduct ? true : false,
      productData: updatedProduct ? updatedProduct : "Cannot update product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
      success: deletedProduct ? true : false,
      productData: deletedProduct ? deletedProduct : "Cannot delete product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
