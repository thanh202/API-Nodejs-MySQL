const express = require("express");
const app = express();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const port = 3001;

const yamljs = require("yamljs");

const swaggerDocument = yamljs.load("swagger.yaml");

app.use(express.json());

const db = require("./models");

//Routers
const postRouter = require("./routers/Posts");
app.use("/posts", postRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Doraemon",
      version: "0.1.0",
      description:
        "This is a simple Post API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "skills with arif",
        url: "arif.com",
        email: "info@email.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3001/posts",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
});
