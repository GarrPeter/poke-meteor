import { Meteor } from "meteor/meteor";
import { DraftsCollection } from "/imports/api/drafts/DraftsCollection";

Meteor.publish("drafts", function publishDrafts() {
  return DraftsCollection.find({ userId: this.userId });
});
