const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.get('/route', (req, res) => {
    let i = 0;
    let stationName = new Array(50);
    const { number } = req.body
    fetch(`https://api.railwayapi.com/v2/route/train/${number}/apikey/qasuec8rhv/`)
    .then(response => response.json())
    .then((data) => {
        data.route.forEach(element => {
             stationName[i] = element.station.name;
             i++;
        });
        return stationName;
    }).then(stationName => res.status(200).json(stationName));
})


module.exports = app;