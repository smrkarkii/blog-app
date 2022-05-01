const mongoose = require('mongoose');
const dotenv = require('dotenv');

const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const morgan = require('morgan');

//app.use(morgan('dev')); //development mode
 //development mode
 
dotenv.config()
//db connection
//mongoose.connect(process.env.MONGO_URI).then(()=>console.log('DB connected'))
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.once('open', () => {
    console.log("connection done ");
}).on('error', err => {
    console.log(`error found ${err.message}`);
})
const myMiddleware = (req, res, next) => {
    console.log('middleware applied');
    next();
};
app.use(myMiddleware);
app.use('/', postRoutes);//work as middleware
app.listen(8080, () => {
    console.log('A node JS API')
});

