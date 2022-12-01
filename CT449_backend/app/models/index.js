const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.Pokemon = require("./pokemon.model");
db.typePokemon = require("./typePokemon.model");

db.TYPES = ["grass", "water", "fire", "poison"];

module.exports = db;
