const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser')
const dotenv = require("dotenv");

//importing mongoDB connection from connection.js file
const connectDB = require('./server/database/connection');

//creating express app
const app = express();

//setup config.env file
dotenv.config( { path : 'config.env'} );
const PORT = process.env.PORT || 8080

//using morgan package
app.use(morgan('tiny'));

connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

//setting up view engine as ejs so we no need to specify .ejs extension
app.set('view engine', 'ejs');

// load assets in app.js file to access file from assets folder
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(process.env.PORT, ()=>{
    console.log(`Server is connected to port ${PORT}`);
});