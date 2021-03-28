import { Drafts } from "/imports/api/drafts/DraftsCollection";

export default Drafts.createQuery("getDraft", {
  $filter({ filters, params }) {
    filters._id = params.draftId;
  },
  name: 1,
  participants: {
    name: 1,
  },
  picks: {
    userId: 1,
    pokemonId: 1,
  },
});
