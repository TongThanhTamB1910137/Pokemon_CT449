const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");

// set up server
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
});

// connect database
const db = require("./app/models");
const typePokemon = db.typePokemon;



mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        // initial();

    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });


// function initial() {
//     // The estimatedDocumentCount() function is quick as it estimates the number of documents in the MongoDB collection. It is used for large collections because this function uses collection metadata rather than scanning the entire collection.

//     typePokemon.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new typePokemon({
//                 type: "grass",
//             }).save((err) => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'grass' to typePokemon collection");
//             });

//             new typePokemon({
//                 type: "water",
//             }).save((err) => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'water' to typePokemon collection");
//             });

//             new typePokemon({
//                 type: "fire",
//             }).save((err) => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'fire' to typePokemon collection");
//             });

//             new typePokemon({
//                 type: "posion",
//             }).save((err) => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'posion' to typePokemon collection");
//             });
//         }
//     });
// }
// initial;

require("./app/routes/pokemon.route")(app);


