const express = require('express');

const router = require('./src/Routes/api');

const app = new express(); // created express instance;

const bodyParser = require('body-parser');

//Security Middleware
const reteLimit = require('express-rate-limit') //express rate limited

const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const hpp = require('hpp');

const cors = require('cors');

//Database
const mongoose = require('mongoose');

//Security Middleware Implimentation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());


//Body Parser Implimentation
app.use(bodyParser.json());


//Rate Limiter
const limiter = reteLimit({windowMs:15*60*100,max:3000});

//Database connection

//Managing Frotend Routing
app.use(express.static('client/build'));

app.get("*", function(req,res){
    req.sendFile(path.resolve(__dirname,'client','build','index.html'));
});


//Managing Backend Api Routing
app.use("/api/v1", router);

module.exports = app;