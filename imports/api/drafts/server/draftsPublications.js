import { Meteor } from "meteor/meteor";
import { Drafts } from "/imports/api/drafts/DraftsCollection";

Meteor.publish("drafts", function publishDrafts() {
  return Drafts.find({ userId: this.userId });
});
