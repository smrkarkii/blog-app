const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.authUser = (req, res, next) => {
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');//string to array
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();

    }
    else{
        //forbidden
        res.sendStatus(403);
        
    }

}
