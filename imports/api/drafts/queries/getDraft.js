import { Drafts } from "/imports/api/drafts/DraftsCollection";

export default Drafts.createQuery({
  $filter({ filters, params }) {
    filters._id = params.draftId;
  },
  name: 1,
  participantIds: 1,
  settings: 1,
  picks: {
    userId: 1,
    pokemonId: 1,
  },
  draftOrder: 1,
  currentPick: 1,
  isRunning: 1,
});
