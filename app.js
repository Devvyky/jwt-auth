const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dotenv = require("dotenv");
const db = require("./config/db");

// configure dotenv for environment variable
dotenv.config({ path: "./config.env" });
const app = express();

db();

// Body Parser
app.use(express.json());

// Mounting
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/upload", uploadRoutes);
// app.use("/api/v1/student", userRoutes);

// Start our server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
