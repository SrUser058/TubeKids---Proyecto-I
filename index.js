const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Database Conection
const db = mongoose.connect(process.env.dbString);

//
const app = express();
app.use(express.json());
app.use(cors({
    domain: '*',
    methods: "*"
}))

const {getFather, postFather, patchFather, deleteFather, getAllFather} = require('./controllers/fathers_controler');

const {getChilds, postChilds, patchChilds, deleteChilds} = require('./controllers/childs_controler');

// Escuchando los puertos
app.get("/api/father", (req,res) => {

});
app.get("/api/father:id", getFather);
app.post("/api/father", postFather);
app.patch("/api/father/:id", patchFather);
app.delete("/api/father/:id", deleteFather);

app.get("/api/kids:id", getChilds);
app.post("/api/kids", postChilds);
app.patch("/api/kids/:id", patchChilds);
app.delete("/api/kids/:id",deleteChilds);

app.get("/api/login", getAllFather)

// Star the service in local network
app.listen(3001, () => console.log(`Service listening on port 3001!`))
