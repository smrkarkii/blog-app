const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

const postRoutes = require("./routes/post");
const morgan = require("morgan");
const user_route = require("./routes/user");

//app.use(morgan('dev')); //development mode
//development mode

dotenv.config();
//db connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));
const myMiddleware = (req, res, next) => {
  console.log("middleware applied");
  next();
};
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(myMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use("/", postRoutes); //work as middleware
app.use("/", user_route);
app.listen(8080, () => {
  console.log("A node JS API");
});
