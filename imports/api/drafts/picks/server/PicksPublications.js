import { Meteor } from "meteor/meteor";
import { Picks } from "/imports/api/drafts/picks/PicksCollection";

Meteor.publish("picks", function publishPicks() {
  return Picks.find({});
});

Picks.expose();
