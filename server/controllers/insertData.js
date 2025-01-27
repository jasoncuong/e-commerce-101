const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const data2 = require("../../data/data2.json");
const slugify = require("slugify");
const categoryData = require("../../data/cate_brand");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
  });
};

//INSERT DATA
const insertProduct = async (req, res) => {
  try {
    const promises = [];

    console.log(data2.variants);
    for (let prod of data2) {
      promises.push(fn(prod));
    }
    await Promise.all(promises);
    return res.status(200).json({ success: true, message: "Done" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    slug: slugify(cate?.cate) + Math.round(Math.random() * 100) + "",
  });
};

//INSERT CATEGORY
const insertCategory = async (req, res) => {
  try {
    const promises = [];

    console.log(categoryData);

    for (let cate of categoryData) {
      promises.push(fn2(cate));
    }
    await Promise.all(promises);
    return res.status(200).json({ success: true, message: "Done" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { insertProduct, insertCategory };
