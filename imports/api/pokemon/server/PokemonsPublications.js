import { Meteor } from "meteor/meteor";
import { Pokemon } from "/imports/api/pokemons/PokemonCollection";

Meteor.publish("pokemon", function publishPokemon() {
  return Pokemon.find({});
});
