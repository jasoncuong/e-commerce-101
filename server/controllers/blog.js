const Blog = require("../models/blog");

//CREATE NEW BLOG
const createNewBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await Blog.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      createdBlog: response ? response : "Create new blog failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });

    return res.status(200).json({
      success: response ? true : false,
      updatedBlog: response ? response : "Update new blog failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL BLOG
const getAllBlogs = async (req, res) => {
  try {
    const response = await Blog.find();

    return res.status(200).json({
      success: response ? true : false,
      getAllBlogs: response ? response : "Get all blogs failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//LIKE DISLIKE BLOG
/**
 * Khi ng dùng like 1 bài blog
 * 1. Check xem người dùng trước đó có dislike hay 0 => bỏ dislike
 * 2. Check xem người đó trước đó có like hay 0 => bỏ like / thêm like
 */
const likeBlog = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.dislikes?.find(
      (item) => item.toString() === _id
    );

    if (alreadyDisliked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { dislikes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    }

    const isLiked = blog?.likes?.find((item) => item.toString() === _id);
    if (isLiked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $push: { likes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//DISLIKE BLOG
/**
 * Khi ng dùng dislike 1 bài blog
 * 1. Check xem người dùng trước đó có like hay 0 => bỏ like
 * 2. Check xem người đó trước đó có dislike hay 0 => bỏ dislike / thêm dislike
 */
const dislikeBlog = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const blog = await Blog.findById(bid);
    const alreadyLiked = blog?.likes?.find((item) => item.toString() === _id);

    if (alreadyLiked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    }

    const isDisliked = blog?.dislikes?.find((item) => item.toString() === _id);
    if (isDisliked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { dislikes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $push: { dislikes: _id },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: response ? true : false, result: response });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewBlog,
  updateBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
};
