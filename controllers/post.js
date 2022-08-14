const Post = require('../models/post')

exports.getPosts = async (req, res) => {
  await Post.find()
  .then(post =>{
    res.render('posts', {
        posts:post
    })
  })
}


exports.createPosts = (req, res) => {
    const post = new Post(req.body)
    console.log("creating post:",req.body);
    post.save()
    .then(result => {
        res.status(200).json({
            post:result
        })
    })
}
exports.getOnePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        //const {password, ...others} = user._doc
        if(!post){
            res.status(404).json("Post not found")
        }
        else{
            res.status(200).json(post);
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
  
   }
        




//Update 
exports.updatePost = async (req,res) => {

    const post = await Post.findById(req.params.id)
    try{
        if(post.name === req.body.name){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            }
            ,{
                new:true
            }
            )
            res.status(200).json(updatedPost)
        }else{
            res.status(500).json("You can change only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
}
//delete
exports.deletePost = async (req,res) => {
    const post = await Post.findById(req.params.id)
    if(req.body.name === post.name){
       
            
            try{
                //await Post.deleteMany({username:user,username})
                await Post.findByIdAndDelete(req.params.id)
                 res.status(200).json("Post has been deleted")
                
             }
             catch(err){
                 res.status(500).json(err);
         
             }
        
        
    
}
    else{
       res.status(400).json("You can delete only your post") 
    }
}
