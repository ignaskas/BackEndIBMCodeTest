const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
const finnhubClient = new finnhub.DefaultApi()
const { body, validationResult } = require('express-validator');
const {model} = require('./model');
const {isEmpty} = require("validator");


api_key.apiKey = "cc0j53qad3ifk6tadct0"
// api_key.apiKey = "sandbox_cbtqqn2ad3i651t1f770"
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Get company data from symbol
app.get('/getData/getCompany', (req, res) => {
    //finnhub api call
    finnhubClient.companyProfile2({'symbol': req.query.value}, (error, data, response) => {
        res.send(data);
    })
})
//get stock price history
app.get('/getData/getCandles', (req, res) => {
    console.log(req.query.ticker, req.query.resolution, "start: ", req.query.startDate, "endDate:",  req.query.endDate);
    finnhubClient.stockCandles(req.query.ticker, req.query.resolution, req.query.startDate, req.query.endDate, (error, data, response) => {
        console.log("Company Ticker: ", req.query.ticker, "Stock Price: ");
        res.send(data);
    });
})

//get a list of all companyies from search params
app.get('/getData', (req, res) => {
    //validate that the req.body[value] is a string that is made out of only letters and spaces
    if (!/^[a-zA-Z.\s]+$/.test(req.body['value'])){
        return res.status(400).json({errorMsg: "Input Must be made out of only letters."});
    }
    if (req.body['value'] === ""){
        return res.status(400).json({errorMsg: "Input can not be empty"});
    }

    finnhubClient.symbolSearch(req.query.value, (error, data, response) => {
        res.send(data);
    })
})

app.listen(3000, (req, res) =>{
    console.log('Express API is running at port 3000');
})

