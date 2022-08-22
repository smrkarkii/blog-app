const { getPosts, createPosts } = require("../controllers/post");
const express = require("express");
const validator = require("../validator");
const { authUser } = require("../middlewares/auth.js");
const { render } = require("ejs");

const router = express.Router();
router.get("/blogs", getPosts);
router.post("/blogs/new", createPosts);
router.get("/blogs/new", (req, res) => {
  res.render("newblog");
});

module.exports = router;
