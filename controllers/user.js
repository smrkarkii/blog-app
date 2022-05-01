const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require("express-jwt")

exports.getUser = (req, res) => {
    const user = User.find()
   .then((result) => {
       res.json({
           user:result
       })
  
   });
        
    // .then( (result) => {
    //     res.json({
    //         user:result
    //     })
    // })
    // .catch(err => {
    //     console.log(err)
    // })
};

exports.createUser = (req, res) => {
    const user = new User(req.body)// of model user
    console.log("creating user:", req.body)
    user.save()  //save returns error and user   user.save( err, user)
    .then((result) => {
        res.status(200).json({
            user:result,
            message:"Successfully signed up"
        })
    })
    .catch(err => console.log(err))
}




    exports.loginUser = (req, res) => {
    //   const username = req.body.username
    //   const user = {name:username}
    //   const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    //     res.json({accessToken: accessToken});
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if(err || !email){
            return res.status(404).json({
                error:"Email not found"
            })
        } 
        if(user.password != password){
            return res.status(400).json({
                error:"Email and password doesn't match"
            })
        }

        //create token
        const token = jwt.sign({_id: user._id},process.env.ACCESS_TOKEN_SECRET)
        //put token in cookies
        res.cookie('token', token, {expire: new Date() + 1})//first ko token is response
        //sending response to front end
        const {_id, email, name} = user
        return res.json({
            token,
            user:{
                _id, name, email 
            }
        })
    })
    }

exports.logoutUser = (req, res) => {
    res.clearCookie("token")
    res.json({
        message:"User signed out successfull"
    })
}

