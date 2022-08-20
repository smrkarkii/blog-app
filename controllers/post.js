const Post = require('../models/post')

exports.getPosts = (req, res) => {
   Post.find()
   .then( posts => {
       res.render('blogs',{
        posts
       })
    })
   .catch(err => {
    console.log(err)
   }
   )
};

exports.getPost = (req, res) => {
   const post = Post.find().select('_id title')
   .then((posts) => {
       res.status(200).json({posts:posts})
   })
   .catch(err => console.log(err))
};


exports.createPosts = (req, res) => {
    const post = new Post(req.body)
    console.log("creating post:",req.body);
    post.save()
    .then(result => {
        res.status(200).json({
            post:result
        })
    })
    //((err, result) => {
    //     if(err)
    //     return res.status(400).json({
    //         error:err
    //     }
    //     )
    //     else{
    //     res.status(200).json({
    //         post:result
    //     })
    // }
    // })
};
