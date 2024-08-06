const express = require('express');
const morgan = require("morgan");
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//creating our own middleware.
app.use((req,res,next)=>{
    console.log("hello from midleware");  
    next();  
});

app.use((req,res,next)=>{
    req.reqTime = new Date().toISOString();
    next();
});


//middleware for routes for tours.
app.use('/api/v1/tours',tourRouter);

//middleware for routes for users.
app.use('/api/v1/users',userRouter);

module.exports = app;










