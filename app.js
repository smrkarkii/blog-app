const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const express = require('express');
const app = express();
const multer = require('multer')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const {v4:uuidv4} =require("uuid")
// const initializePassport = require('./passport-config')
// initializePassport(passport, email => {
//     user
// })

const postRoutes = require('./routes/post');
const morgan = require('morgan');
const user_route = require('./routes/user');



//app.use(morgan('dev')); //development mode
 //development mode
 
// const urlencodedParser = bodyParser.urlencoded({extend: false})

dotenv.config()
//db connection
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('DB connected'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//can use as req.body.something 
// app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts)
app.set('view engine', 'ejs');

app.use(expressValidator());

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
})
)

app.use('/', postRoutes);//work as middleware
app.use('/',user_route);
app.listen(9000, () => {
    console.log('A node JS API')
});




