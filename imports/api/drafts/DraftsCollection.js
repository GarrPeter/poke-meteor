import { Mongo } from "meteor/mongo";
import _ from "underscore";
import SimpleSchema from "simpl-schema";
import DraftOrderEnum from "./enums/DraftOrderEnum";

export const draftSettingsSchema = new SimpleSchema({
  draftOrder: { type: String, allowedValues: _.values(DraftOrderEnum) },
  numberRounds: SimpleSchema.Integer,
  minutesToPick: SimpleSchema.Integer,
});

const Drafts = new Mongo.Collection("drafts");
Drafts.attachSchema(
  new SimpleSchema({
    name: { type: String },
    userId: { type: String },
    participantIds: [String],
    isRunning: Boolean,
    draftOrder: [String],
    currentPick: Number,
    settings: { type: draftSettingsSchema, optional: true },
  })
);

export { Drafts };
