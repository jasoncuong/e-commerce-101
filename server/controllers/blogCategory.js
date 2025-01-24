const BlogCategory = require("../models/blogCategory");

//CREATE BLOG CATEGORY
const createBlogCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await BlogCategory.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      createdBlogCategory: response
        ? response
        : "Create new blog category failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL BLOG CATEGORY
const getBlogCategories = async (req, res) => {
  try {
    const response = await BlogCategory.find().select("title _id");

    return res.status(200).json({
      success: response ? true : false,
      productBlogCategories: response
        ? response
        : "Get blog categories failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE BLOG CATEGORY
const updateBlogCategory = async (req, res) => {
  try {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: response ? true : false,
      updatedBlogCategory: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//DELETE BLOG CATEGORY
const deleteBlogCategory = async (req, res) => {
  try {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndDelete(bcid);

    return res.status(200).json({
      success: response ? true : false,
      deletedBlogCategory: response ? response : "Deleted failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
};
