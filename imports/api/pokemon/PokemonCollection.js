// Assets.getText("/some_folder/test.txt");
import _ from "underscore";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import PokemonTypesEnum from "/imports/api/pokemon/enums/types";

const statsTable = new SimpleSchema({
  hp: Number,
  attack: Number,
  defense: Number,
  specialAttack: Number,
  specialDefense: Number,
  speed: Number,
});

const Pokemon = new Mongo.Collection("pokemon");
Pokemon.attachSchema(
  new SimpleSchema({
    name: String,
    num: SimpleSchema.Integer,
    types: Array,
    "types.$": { type: String, allowedValues: _.values(PokemonTypesEnum) },
    abilities: [
      {
        0: String,
        1: { type: String, optional: true },
        H: { type: String, optional: true },
        S: { type: String, optional: true },
      },
    ],
    baseStats: { type: statsTable },
  })
);

export { Pokemon };
