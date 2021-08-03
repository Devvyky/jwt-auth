const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const { name, desc, image } = req.body;
  try {
    if ((!name, !desc, !image)) {
      res.json({ status: "failed", message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      desc,
      image,
      user: req.user._id,
    });

    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getAllUserProducts = async (req, res) => {
  try {
    const product = await Product.find({ user: req.user._id });

    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, desc } = req.body;
  try {
    if ((!name, !desc)) {
      res.json({ status: "failed", message: "All fields are required" });
    }
    const product = await Product.findById(req.params.id);

    product.name = name;
    product.desc = desc;

    await product.save();

    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});

    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ error: error.message });
  }
};
