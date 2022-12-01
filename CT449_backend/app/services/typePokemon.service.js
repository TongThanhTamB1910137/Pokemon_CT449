const typePokemon = require('../models/typePokemon.model')

class TypePokemonService {
    async create(payload) {
        const newTypePokemon = new typePokemon(payload);
        await newTypePokemon.save();
        return newTypePokemon;
    }
    async findById(id) {
        return await typePokemon.findOne({
            _id: id,
        })
    }
    async update(id, update) {
        console.log(update);

        const result = await typePokemon.findOneAndUpdate({ _id: id }, update, {
            new: true,
        });
        return result;
    }

    /////
    async find() {
        const cursor = await typePokemon.find({});
        console.log(cursor);
        return cursor;
    }
}
module.exports = new TypePokemonService()