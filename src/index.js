



























const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const MONGO_URL = "mongodb+srv://cursola2:admin@cluster0.1du0l.mongodb.net/db-la2?retryWrites=true&w=majority";

const app = express();
const router = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database.");
        app.listen({ port: PORT }, () => {
            console.log(`Server running on port ${PORT}.`);
        });

    } catch (error) {
        console.log(`Failed to connect to database.`);
        console.log(`Error: ${error}.`);

    }
};

connectDb();
