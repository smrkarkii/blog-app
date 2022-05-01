// const req = require("express/lib/request");
// const res = require("express/lib/response");

const User = require("../models/user");

exports.createPostValidator = (req, res, next ) => {
        req.check('title', "Write a title").notEmpty();
        req.check('title', "title lenght should be between bla bla").isLength({
            min:4,
            max:150
        });
        req.check('body', "Write a body").notEmpty()
        req.check('body', "body lenght should be between bla bla").isLength({
            min:4,
            max:3000
        });
        //check error 
        const errors = req.validationErrors()
        if(errors){
            const firstError = errors.map((error) => error.msg)[0]
            return res.status(400).json({error:firstError})
           
        }
        next();
};

exports.createUserValidator = (req, res, next ) => {
    req.check('name',"Write a name").notEmpty();
    // .custom(value => {
    //     return User.find({ where:
    //         {name: value}

    //     })
    //     .then(() => {
    //         return Promise.reject("User already Taken")
    //     })
    // })
    req.check('email').notEmpty().withMessage("email field can't be empty").isEmail().withMessage("not an email")
    req.check('password').isLength({min:8, max:29}).withMessage("should be minimum 8 ").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("special char, capital small sab haal")
    req.check('phone',"Empty field").notEmpty()
    req.check('phone')
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)
        return res.status(400).json({error:firstError})
    }
        next();
};

//proceed to next middleware `      
