// Assets.getText("/some_folder/test.txt");
import _ from "underscore";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import PokemonTypesEnum from "/imports/api/pokemon/enums/types";

const statsTable = new SimpleSchema({
  hp: Number,
  atk: Number,
  def: Number,
  spa: Number,
  spd: Number,
  spe: Number,
});

const Pokemon = new Mongo.Collection("pokemon");
Pokemon.attachSchema(
  new SimpleSchema({
    name: String,
    num: SimpleSchema.Integer,
    types: Array,
    "types.$": { type: String, allowedValues: _.values(PokemonTypesEnum) },
    abilities: { type: Object, optional: true },
    baseStats: { type: statsTable },
  })
);

export { Pokemon };
