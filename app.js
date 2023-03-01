const port = 3000;
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Declare the express app
const app = express();

// Swagger stuff
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CAA Finance Express API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./endpoints/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Get the endpoints
const auth = require("./endpoints/auth");
const ratingCategories = require("./endpoints/ratingCategories");
const ratingFactors = require("./endpoints/ratingFactors");

// Next auth endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the endpoints
app.use("/auth", auth);
app.use("/ratingCategories", ratingCategories);
app.use("/ratingFactors", ratingFactors);

// Start the server
app.listen(port, () => {
  console.log(`CAA backend listening on port ${port}`);
});
