import { check } from "meteor/check";
import { Drafts } from "/imports/api/drafts/DraftsCollection";

Meteor.methods({
  "drafts.insert"(name) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    Drafts.insert({
      name,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
  "drafts.remove"(draftId) {
    check(draftId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error("Access denied");
    }

    Drafts.remove(draftId);
  },
  "drafts.addUser"(userId, draftId) {
    check(userId, String);
    check(draftId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error("Access denied.");
    }

    Drafts.update(draftId, {
      /* $set: {
          isChecked,
        }, */
    });
  },
});
