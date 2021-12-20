require ("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_DB_URL; 

const app = express();
const router = require("./routes/index");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));
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
