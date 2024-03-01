const express = require('express');
const mongoose = require('mongoose');
const cors = require('mongoose');

//Database Conection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://Eduardo:AAcCFet9ViGd9Czy@testdatabase.e8b2cjg.mongodb.net/utn", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//
const app = express();
app.use() = express.json();
app.use(cors({
    domain: '*',
    methods: "*"
}))






// Star the service in local network
app.listen(3001, () => console.log(`Service listening on port 3001!`))
