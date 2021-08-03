const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  desc: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
});

const Product = mongoose.model("Product", userSchema);

module.exports = Product;
