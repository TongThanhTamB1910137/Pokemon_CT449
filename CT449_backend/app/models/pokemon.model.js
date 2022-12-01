const mongoose = require("mongoose");

const Pokemon = mongoose.model(
    "Pokemon",
    new mongoose.Schema({
        name: String,
        img: String,
        types:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "typePokemon",
        },
        hp: String,
        att: String,
        speed: String,
    })
);

module.exports = Pokemon;
