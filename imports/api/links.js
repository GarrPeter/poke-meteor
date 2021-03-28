import { Drafts } from "/imports/api/drafts/DraftsCollection";
import { Picks } from "/imports/api/drafts/picks/PicksCollection";
import { Pokemon } from "/imports/api/pokemon/PokemonCollection";

Drafts.addLinks({
  participants: {
    type: "many",
    collection: Meteor.users,
    field: "participantIds",
  },
  picks: {
    collection: Picks,
    inversedBy: "draft",
  },
});

Picks.addLinks({
  user: {
    type: "one",
    collection: Meteor.users,
    field: "userId",
  },
  pokemon: { type: "one", collection: Pokemon, field: "pokemonId" },
  draft: {
    type: "one",
    collection: Drafts,
    field: "draftId",
  },
});

Pokemon.addLinks({
  picks: {
    collection: Picks,
    inversedBy: "pokemon",
  },
});

Meteor.users.addLinks({
  drafts: {
    collection: Drafts,
    inversedBy: "participants",
  },
  picks: {
    collection: Picks,
    inversedBy: "user",
  },
});
