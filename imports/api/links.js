import { Drafts } from "/imports/api/drafts/DraftsCollection";

Drafts.addLinks({
  participants: {
    type: "many",
    collection: Meteor.users,
    field: "participantIds",
  },
});

Meteor.users.addLinks({
  drafts: {
    collection: Drafts,
    inversedBy: "participants",
  },
});
