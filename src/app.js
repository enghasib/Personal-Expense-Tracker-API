const express = require("express");
const router = require("./routes/routes");
const dotenv = require("dotenv");
const swagger = require("swagger-ui-express");
const yaml = require("yamljs");
const morgan = require("morgan");

const corsMiddleware = require("../src/middlewares/cors");

dotenv.config({ debug: false });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(corsMiddleware);

app.use(router);

// Define a simple route for testing api
app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "API is healthy",
  });
});

//Global Error Handler
app.use((err, _req, res, _next) => {
  // log error
  console.error(err);
  // format error
  res.status(err.code || 500).json({
    message: err.message,
    code: err.code || 500,
  });
});

const swaggerDocument = yaml.load("./swagger.yaml");
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

module.exports = app;
