import { Pokemon } from "/imports/api/pokemon/PokemonCollection";

Meteor.methods({
  "pokemon.insert"(data) {
    Pokemon.insert(data);
  },
});
