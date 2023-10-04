require("dotenv").config({
  debug: process.env.NODE_ENV == "development",
});
require("express-async-errors");

//http
const { createServer } = require("http");
/////
const path = require("path");
const express = require("express");
const dbConnect = require("./src/utils/db.connect");
const session = require("express-session");
const morgan = require("morgan");
const four_oh_four = require("./src/middlewares/404");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const cookieParser = require("cookie-parser");
const logger = require("./src/utils/logger");
const cors = require("cors");

//starting point

// console.clear();
const app = express();
const PORT = process.env.PORT || 6986;
/*--------------------------------Middlewares--------------------------*/

//morgan
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//express as a middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(cookieParser());

// //
/* -------------------routes------------------------ */
app.get("/", (_, res) => {
  res
    .status(200)
    .send("<h2>Welcome to Computer Science Departmental Portal!!!</h2>");
});

app.use("/api/v1", require("./src/routes/routes"));
app.use(four_oh_four);
app.use(errorHandlerMiddleware);

const server = createServer(app);
// server up
dbConnect(process.env.MONGO_URL).then(() =>
  server.listen(
    PORT,
    logger.info(
      `
      .....................................................................
      |                          Server info                              |
      |-------------------------------------------------------------------|
      | Status              ---->        Running,                         |
      | Mode                ---->        ${process.env.NODE_ENV}                      |
      | Host_address        ---->        http://localhost:${PORT}            |
      | (Server file)       ---->       ./backend/index.js                |
      |===================================================================|
      .....................................................................
      `
    )
  )
);
