const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: String,
    user: {
        type: mongoose.Types.ObjectId,
    },
  });


const Product = mongoose.model("Product", userSchema);

module.exports = Product;
