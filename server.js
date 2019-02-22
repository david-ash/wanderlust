//Importing Express Package
const express = require('express');
//IMporting body Parser
const bodyParser = require('body-parser');

//Importing database
const db = require('./database/db');

//Importing Function
const signin = require('./controllers/signin');
//console.log();


//Creating an app
const app = express();
// Parsing the data
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.json("hello");
// })


// Route for the signin
app.get('/signin', (req, res) => {
    signin(req, res);
   // console.log(res);
});


//Listening to the port
app.listen(9874, () => {
    console.log("Listening to the Port 9874");
});