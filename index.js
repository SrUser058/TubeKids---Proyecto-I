const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Database Conection
const db = mongoose.connect("mongodb+srv://Eduardo:AAcCFet9ViGd9Czy@testdatabase.e8b2cjg.mongodb.net/TubeKids");

//
const app = express();
app.use(express.json());
app.use(cors({
    domain: '*',
    methods: "*"
}))

const {getFather, postFather, patchFather, deleteFather, getAllFather} = require('./controllers/fathers_controler');

const {getChilds, postChilds, patchChilds, deleteChilds} = require('./controllers/childs_controler');

const {getPlaylist, postPlaylist, patchPlaylist, deletePlaylist} = require('./controllers/playlists_controler');

// Escuchando los puertos
app.get("/api/father/:id", getFather);
app.post("/api/father", postFather);
app.patch("/api/father/:id", patchFather);
app.delete("/api/father/:id", deleteFather);

app.get("/api/childs/:id", getChilds);
app.post("/api/childs", postChilds);
app.patch("/api/childs/:id", patchChilds);
app.delete("/api/childs/:id",deleteChilds);

app.get("/api/playlists/:id", getPlaylist);
app.post("/api/playlists", postPlaylist);
app.patch("/api/playlists/:id", patchPlaylist);
app.delete("/api/playlists/:id", deletePlaylist);

app.get("/api/login", getAllFather)

// Star the service in local network
app.listen(3001, () => console.log(`Service listening on port 3001!`))
