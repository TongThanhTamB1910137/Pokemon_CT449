const mongoose = require("mongoose");


const typePokemon = mongoose.model(
    "typePokemon",
    new mongoose.Schema({
        type: String,
    })
);

module.exports = typePokemon;
