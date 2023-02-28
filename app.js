const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Declare the express app
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Get the endpoints
const auth = require("./endpoints/auth");
const ratingCategories = require("./endpoints/ratingCategories");
const ratingFactors = require("./endpoints/ratingFactors");

// Use the endpoints
app.use("/auth", auth);
app.use("/ratingCategories", ratingCategories);
app.use("/ratingFactors", ratingFactors);

// Start the server
app.listen(port, () => {
  console.log(`CAA backend listening on port ${port}`);
});
