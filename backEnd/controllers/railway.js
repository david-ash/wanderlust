const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
//APIKEY 
const apiKey = 'qasuec8rhv';
app.use(bodyParser.json());

//Using an async function, because we are sending response
//to the client outside the fetch, so async will wait for the
// the fetch to happen before moving to the next line

//This function gives the station code for a city name
//it is an async function which means, it waits for the
//await to work before moving to the next line
//takes name as input
const getCode = async name => {
    let sCode;
    await fetch(`https://api.railwayapi.com/v2/suggest-station/name/${name}/apikey/${apiKey}/`)
    .then(data=>data.json())
    .then(data => sCode = data.stations[0].code)
     return sCode;

}

//route to get the route of a train
app.get('/route', (req, res) => {
    const { number } = req.body
    fetch(`https://api.railwayapi.com/v2/route/train/${number}/apikey/${apiKey}/`)
    .then(response => response.json())
    .then((data) => {
        //creating an array of the stations using map method
        let stationName =  data.route.map(element => {
             return element.station.name;
        });
        return stationName;
    })
    .then(stationName => res.status(200).json(stationName))
    .catch(err => console.log(err));
})

//route to check the trains between to cities
//takes source, destination, date as input
app.get('/between', (req, res) => {
    const { source, destination } = req.body;
    //Fetching the trains between stations
    //async await is used so to get
    //the code of the railway stations
    const trains = async (source, destination) => {
        //dont forget to change date
        fetch(`https://api.railwayapi.com/v2/between/source/${await getCode(source)}/dest/${await getCode(destination)}/date/14-04-2019/apikey/${apiKey}/`)
        .then(data => data.json())
        .then(data => {
            let trainName = data.trains.map(element => {
                return element.name;
            })
            return trainName;
        })
        .then(trainName => res.status(200).json(trainName));
        
    }
    trains(source, destination);

})


//route to check the live status of the train
//takes trainnumber, date and station as i/p
app.get('/live', (req, res) => {
    const { trainNumber, station } = req.body;
    //using an async function because we need intermediate values from other fetches
    const lStatus = async(trainNumber, station) => {
        //don't forget to change the date
        fetch(`https://api.railwayapi.com/v2/live/train/${trainNumber}/station/${await getCode(station)}/date/09-04-2019/apikey/${apiKey}/`)
        .then(data => data.json())
        .then(data => {
            res.json({
                position: data.position,
                status: data.status,
                trainName: data.train.name
            })
        })
        .catch(err => console.log(err));
    }
    lStatus(trainNumber, station);
})

//route to calculate the fare between two stations
//It takes trainNumber, source, destination, age, clas, quota, date as i/p
app.get('/fare', (req, res) => {
    //using an async function because we need intermediate values from other fetches
    const fare = async({ trainNumber, source, destination, age, clas, quota }) => {
        //dont forget to change the date
        fetch(`https://api.railwayapi.com/v2/fare/train/${trainNumber}/source/${await getCode(source)}/dest/${await getCode(destination)}/age/${age}/pref/${clas}/quota/${quota}/date/20-05-2019/apikey/${apiKey}/`)
        .then(data => data.json())
        .then(data => res.json({
            trainName: data.train.name,
            source: data.from_station.name,
            class: data.journey_class.name,
            quota: data.quota.name,
            destination: data.to_station.name,
            fare: data.fare
        }));
    }

    fare(req.body);
})


module.exports = app;