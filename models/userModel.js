const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String 
  });


// const User = [
//   {
//     id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john@doe.com",
//     password: "test1234",
//   },
// ];

const User = mongoose.model("User", userSchema);


module.exports = User;
