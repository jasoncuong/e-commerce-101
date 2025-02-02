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
      message: error.message,
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
      message: error.message,
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
    if (queries?.category) {
      formatedQueries.category = { $regex: queries.category, $options: "i" };
    }
    if (queries?.color) {
      formatedQueries.color = { $regex: queries.color, $options: "i" };
    }
    let queryCommand = Product.find(formatedQueries);

    //Sorting
    if (req.query.sort) {
      //abc,efg => [abc,efg] => abc efg
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }

    //Pagination
    //limit: số object lấy về 1 lần gọi API
    //skip
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    //Execute query
    //Số lượng sp thỏa mãn diều kiện !== số lượng sp trả về 1 lần gọi API
    queryCommand
      .then(async (response) => {
        const counts = await Product.find(formatedQueries).countDocuments();

        return res.status(200).json({
          success: response ? true : false,
          counts,
          products: response ? response : "Cannot get products",
        });
      })
      .catch((err) => {
        return res.status(401).json({ success: false, message: err.message });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
      message: error.message,
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
      message: error.message,
    });
  }
};

//RATINGS
const ratings = async (req, res) => {
  try {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    //Tìm xem ng dùng đã rating hay chưa
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find(
      (item) => item.postedBy.toString() === _id
    );

    if (alreadyRating) {
      //Update star & comment
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
    } else {
      //Add star & comment
      await Product.findByIdAndUpdate(
        pid,
        {
          $push: { ratings: { star, comment, postedBy: _id } },
        },
        { new: true }
      );
    }

    //Sum ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce(
      (sum, item) => sum + +item.star,
      0
    );
    updatedProduct.totalRatings =
      Math.round((sumRatings * 10) / ratingCount) / 10;

    await updatedProduct.save();

    return res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Upload Images with Cloundinary
const upLoadImagesProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!req.files) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { images: { $each: req.files.map((item) => item.path) } },
      },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      updatedProduct: response ? response : "Cannot upload images product",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  upLoadImagesProduct,
};
