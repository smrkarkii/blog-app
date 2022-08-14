const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const express = require('express');
const app = express();
const multer = require('multer')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')



const postRoutes = require('./routes/post');
const morgan = require('morgan');
const user_route = require('./routes/user');


app.use(expressLayouts)
app.set('view engine', 'ejs');
//app.use(morgan('dev')); //development mode
 //development mode
 
//const urlencodedParser = bodyParser.urlencoded({extend: false})

dotenv.config()
//db connection
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('DB connected'))
const myMiddleware = (req, res, next) => {
    console.log('middleware applied');
    next();
};
app.use(myMiddleware);
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/', postRoutes);//work as middleware
app.use('/',user_route);
app.listen(9000, () => {
    console.log('A node JS API')
});




