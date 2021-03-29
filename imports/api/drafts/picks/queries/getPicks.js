import { Picks } from "/imports/api/drafts/picks/PicksCollection";

export default Picks.createQuery({
  $filter({ filters, params }) {
    filters.draftId = params.draftId;
  },
  pokemonId: 1,
  userId: 1,
  draftId: 1,
});
