const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const characters = require("../data/personajes.json");
const movies = require("../data/peliculas.json");

const app = express();
const PORT = 3000;

let databaseObject = {};
let charactersCollectionObj = {};
let moviesCollectionObj = {};

const dbConnection = async () => {
    const uri = "mongodb+srv://cursola2:admin@cluster0.1du0l.mongodb.net/db-la2?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useUnifiedTopology: true });
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
dbConnection();//.catch(console.error);

const mappedCharacters = characters.map((item) => { return { ...item, img: `http://localhost:${PORT}/${item.img}` }; });

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

// -------------- Recurso PELÍCULAS --------------  //
// metodo GET de películas
app.get("/peliculas", async (req, res) => {
    try {
        const allPeliculas = await moviesCollectionObj.find({}).toArray();
        res.status(200).send(allPeliculas);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


// -------------- Recurso PERSONAJES --------------  //
// metodo get de personajes
app.get("/personajes", async (req, res) => {
    try {
        const allPersonajes = await charactersCollectionObj.find({}).toArray();
        res.status(200).send(allPersonajes);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// metodo GET por ID
app.get("/personajes/:id", async (req, res) => {
    try {
        const personaje = await charactersCollectionObj.findOne({ id: req.params.id });
        if (!personaje) {
            return res.status(404).send({ message: `Character ${req.params.id} not found.` });
        }
        res.status(200).send(personaje);
    } catch (error) {
        return res.status(500).send({ message: `An error occured during the request.`, error: error });
    }
});

// metodo GET por CASA
app.get("/personajes/casa/:casa", async (req, res) => {
    try {
        const personajes = await charactersCollectionObj.find({ casa: req.params.casa }).toArray();
        if (!personajes.length) {
            return res.status(404).send({ message: `Characters from ${req.params.casa} house not found.` });
        }
        res.status(200).send(personajes);
    } catch (error) {
        return res.status(500).send({ message: `An error occured during the request.`, error: error });
    }
});

// metodo POST para personajes
app.post("/personajes", async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: `Unable to add character because body is empty.` });
        }
        const newCharacter = { ...req.body };
        await charactersCollectionObj.insertOne(newCharacter);
        res.status(200).send({ message: `Character added succesfully.` });
    } catch (error) {
        return res.status(500).send({ message: `An error occured during the request.`, error: error });
    }
});

// metodo UPDATE para personajes
app.put("/personajes/:id", async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: `Unable to update character because body is empty.` });
        }

        const character = await charactersCollectionObj.findOne({ id: req.params.id });
        if (!character) {
            return res.status(404).send({ message: `Unable to update, character ${req.params.id} not found.` });
        }

        const characterToUpdateValues = {
            $set: {
                nombre: req.body.nombre,
                bio: req.body.bio,
                img: req.body.img,
                aparicion: req.body.aparicion,
                casa: req.body.casa,
            }
        };

        const updateOne = await charactersCollectionObj.updateOne({ id: req.params.id }, characterToUpdateValues);
        res.status(200).send({ message: `Character ${req.params.id} updated succesfully.`, character: updateOne });

    } catch (error) {
        return res.status(500).send({ message: `An error occured during the request.`, error: error });
    }

});

// metodo DELETE para personajes
app.delete("/personajes/:id", async (req, res) => {
    try {
        const characterDeleteData = await charactersCollectionObj.deleteOne({ id: req.params.id });
        if (!characterDeleteData.deletedCount) {
            return res.status(404).send({ message: `Unable to delete, character ${req.params.id} not found.` });
        }

        const moviesDeleteData = await moviesCollectionObj.deleteMany({ idPersonaje: req.params.id });
        res.status(200).send({ message: `Character ${req.params.id} ${moviesDeleteData.deletedCount ? `and associated movies deleted succesfully.` : `deleted succesfully.`}` });
    }
    catch (error) {
        return res.status(500).send({ message: `An error occured during the request.`, error: error });
    }
});