//Importing Express Package
const express = require('express');
//IMporting body Parser
const bodyParser = require('body-parser');

//Importing database
const db = require('./database/db');

//Importing Function
const signin = require('./controllers/signin');
const register = require('./controllers/register');
//console.log();

//Importing app of railway for furthur routing
const railway = require('./controllers/railway');


//Creating an app
const app = express();
// Parsing the data
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.json("hello");
// })


// Route for the signin
app.post('/signin', (req, res) => {
    signin(req, res);
});

//Route for registration
app.post('/register', (req, res) => {
    register(req, res);
});

//for railway
app.use('/railway', railway);

//Listening to the port
app.listen(9874, () => {
    console.log("Listening to the Port 9874");
});