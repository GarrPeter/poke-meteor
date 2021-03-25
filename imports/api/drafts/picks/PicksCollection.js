import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Picks = new Mongo.Collection("picks");
Picks.attachSchema(
  new SimpleSchema({
    userId: String,
    draftId: String,
    pokemonId: String,
  })
);

export { Picks };
