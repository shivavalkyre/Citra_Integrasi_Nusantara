const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util = require('util');
const dotenv = require('dotenv');
dotenv.config();

const booking = require ('./booking.js');
const hitunggaji = require('./hitunggaji.js');
const obat = require('./obat.js');
const umur = require('./umur.js');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.post("/bookingkamaroperasi/:bookingdate(*)/:durasi",booking.create)
app.post("/hitunggaji",hitunggaji.hitunggaji)
app.post("/validasialergiobat",obat.alergen)
app.get("/calculateage/:dob",umur.hitungumur)

app.get("/", (req, res) => {
    res.send({
        message: "🚀 API Citra Integrasi Nusantara v1.0"
    });
});

//app.use(cookieParser());
const PORT = process.env.PORT || process.env.PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`))
