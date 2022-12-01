
const Pokemon = require("../models/pokemon.model")

class PokemonService {
    async create(payload) {
        const newPokemon = new Pokemon(payload);
        await newPokemon.save();
        return newPokemon;
    }

    async find() {
        const cursor = await Pokemon.find().populate("types");
        console.log(cursor);
        return cursor;
    }
    async findById(id) {
        return await Pokemon.findOne({
            _id: id,
        }).populate("types");
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findByType(types) {
        return await Pokemon.find({
            types: types,
        });
    }
    async update(id, update) {
        console.log(update);

        const result = await Pokemon.findOneAndUpdate({ _id: id }, update, {
            new: true,
        });
        return result;
    }
    async delete(id) {
        const result = await Pokemon.findOneAndDelete({
            _id: id,
        });
        return result;
    }
    async deleteAll() {
        const result = await Pokemon.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = new PokemonService();
