const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const Post = require('../models/post');
const expressJwt = require("express-jwt");
const { response, Router } = require('express');
const { post } = require('../routes/user');
const { render } = require('ejs');

//home user
exports.homeuser =   (req, res) => {
    res.render('homeuser.ejs')
}
exports.registerPage = (req, res ) => {
    res.render('register.ejs')
}
//getting  users
exports.getUser = async (req, res) => {
    await User.find()
   .then((result) => {
      res.render('users.ejs', {
        users:result
      })
       })
  
   }
   //getting a user
   exports.getOneUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        //const {password, ...others} = user._doc
        if(!user){
            res.status(404).json("User not found")
        }
        else{
            res.status(200).json(user);
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
  
   }
        

//register
exports.createUser = async (req, res) => {
    try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hash,
        phone:req.body.phone,
    })

    const user = await newUser.save();
    res.render('afterRegister', {
        user:newUser
    })
    }
    catch(err){
    res.status(500).json(err);
    }
}




    exports.loginUser = async (req, res) => {
    try{
    const {email} = req.body
    const user = await User.findOne({email:email})
    const validate = await bcrypt.compare(req.body.password , user.password)
        if(!user){
            res.status(400).json({
                error:"Email not found"
            })
        } 
         else if(!validate){
            res.status(400).json({
                error:"Email and password doesn't match"
            })
        }
        else{
           // const {password, ...others} = user;
           res.render('dashboard',{
            user:user
           });
            
        }
    }
        catch(err){
           res.status(500).json(err);
        }
    }
    
exports.logoutUser = (req, res) => {
    res.clearCookie("token")
    res.json({
        message:"User signed out successfull"
    })
}
//Update 
exports.updateUser = async (req,res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)

        }
    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body, //everything erequested
        },{new:true});
        res.status(200).json(updatedUser)
       
    }
    catch(err){
        res.status(500).json(err);

    }
}
    else{
       res.status(401).json("You can update only your accoung") 
    }
}
//delete
exports.deleteUser = async (req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:user,username})
                await User.findByIdAndDelete(req.params.id)
                 res.status(200).json("user has been deleted")
                
             }
             catch(err){
                 res.status(500).json(err);
         
             }
        }
        catch(err){
            res.status(404).json("User not found")
        }
    
}
    else{
       res.status(400).json("You can delete only your account") 
    }
}
