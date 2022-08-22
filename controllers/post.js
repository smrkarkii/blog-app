const Post = require("../models/post");
exports.getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.render("blognew", { articles: posts });
    })
    .catch((err) => console.log(err));
};
exports.createPosts = (req, res) => {
  const post = new Post(req.body);
  console.log("creating post:", req.body);
  post.save().then((result) => {
    console.log(result);
    res.redirect("/blogs");
  });
};
