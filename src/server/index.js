const express = require("express");
const bodyParser = require("body-parser");
const {
    MongoClient
} = require("mongodb");
const characters = require("../data/personajes.json");
const movies = require("../data/peliculas.json");

const app = express();
const PORT = 3000;

let databaseObject = {};
let charactersCollectionObj = {};
let moviesCollectionObj = {};

const dbConnection = async () => {
    const uri = "mongodb+srv://cursola2:admin@cluster0.1du0l.mongodb.net/db-la2?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {
        useUnifiedTopology: true
    });
    try {
        // Conectar el backend con el cluster de MongoDB
        await client.connect();
        databaseObject = await client.db("db-la2")
        charactersCollectionObj = databaseObject.collection("personajes");
        moviesCollectionObj = databaseObject.collection("peliculas");

        console.log(`Cloud DB Connected - Mongo DB`);
    } catch (error) {
        console.log(error);
    }
}
dbConnection().catch(console.error);

const mappedCharacters = characters.map((item) => {
    return {
        ...item,
        img: `http://localhost:${PORT}/${item.img}`
    };
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// -------------- Recurso PERSONAJES
// metodo get de personajes
app.get("/personajes", (req, res) => {
    res.status(200).send(mappedCharacters);
});

// metodo GET por ID
app.get("/personajes/:id", (req, res) => {
    const character = mappedCharacters.find((item) => item.id === req.params.id);
    if (character) {
        res.status(200).send(character);
    } else {
        res.status(404).send(`Character ${req.params.id} not found.`);
    }
});

// metodo GET por CASA
app.get("/personajes/casa/:casa", (req, res) => {
    const character = mappedCharacters.filter((character) => character.casa === req.params.casa);
    if (character.length) {
        res.status(200).send(character);
    } else {
        res.status(404).send(`Characters from ${req.params.casa} house not found.`);
    }
});

// metodo POST para personajes
app.post("/personajes", (req, res) => {
    const newValues = req.body;
    const response = [...mappedCharacters, newValues]
    res.status(200).send(response);
});

// metodo UPDATE para personajes
app.put("/personajes/:id", (req, res) => {
    const doesItExist = mappedCharacters.some((character) => character.id === req.params.id);

    if (!doesItExist) {
        res.status(404).send(`Unable to update, character ${req.params.id} not found.`);
    } else if (Object.keys(req.body).length === 0) {
        res.status(400).send(`Unable to update, body request empty.`);
    } else {
        const character = mappedCharacters.map((character) => {
            return character.id === req.params.id ? req.body : character;
        });
        res.status(200).send(character);
    }
});

// metodo DELETE para personajes
app.delete("/personajes/:id", (req, res) => {
    const doesItExist = mappedCharacters.some((character) => character.id === req.params.id);
    if (doesItExist) {
        const character = mappedCharacters.filter((character) => character.id !== req.params.id);
        res.status(200).send(character);
    } else {
        res.status(404).send(`Unable to delete, character ${req.params.id} not found.`);
    }
});