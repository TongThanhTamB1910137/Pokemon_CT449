
const pokemonController = require("../controllers/pokemon.controller");
const typePokemonController = require("../controllers/typePokemon.controller");

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, application/json"
    //     );
    //     next();
    // });

    app.post("/api/pokemon/create", pokemonController.create);
    app.post("/api/pokemon/createtypepokemon", typePokemonController.create);



    app.get("/api/pokemon", pokemonController.findAll);
    app.get('/api/pokemon/typepokemon', typePokemonController.findAll)
    app.get("/api/pokemon/:id", pokemonController.findById);

    app.delete("/api/pokemon/:id", pokemonController.delete);
    app.put("/api/pokemon/:id", pokemonController.update);


    app.put("/api/Typepokemon/:id", typePokemonController.update);


};
