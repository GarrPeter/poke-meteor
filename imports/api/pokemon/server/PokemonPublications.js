import { Meteor } from "meteor/meteor";
import { Pokemon } from "/imports/api/pokemon/PokemonCollection";

Meteor.publish("pokemon", function publishPokemon() {
  return Pokemon.find({});
});

Pokemon.expose();
