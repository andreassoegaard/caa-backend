const port = 3000;
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");

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
  apis: ["./api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(helmet());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    "http://localhost:3001",
    "https://caa-frontend.vercel.app",
    "https://caafinance.dk",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Use the endpoints
const auth = require("./api/auth");
const ratingCategories = require("./api/qaCategories");
const ratingFactors = require("./api/qaFactors");
app.use("/api/auth", auth);
app.use("/api/qaCategories", ratingCategories);
app.use("/api/qaFactors", ratingFactors);

// Start the server
app.listen(port, () => {
  console.log(`CAA backend listening on port ${port}`);
});
