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
  "drafts.addParticipant"(userId, draftId) {
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
      $push: {
        participantIds: userId,
      },
    });
  },
});

/* const Posts = new Mongo.Collection('posts');

Meteor.methods({
    posts() {
        return Posts.find({}, {
            fields: {
                title: 1,
                createdAt: 1,
                createdBy: 1,
            }
        }).fetch();
    }
})
Transforming this into a Grapher query looks like this:

Meteor.methods({
    posts() {
        const query = Posts.createQuery({
            title: 1,
            createdAt: 1,
            createdBy: 1,
        });

        return query.fetch();
    }
}) */
