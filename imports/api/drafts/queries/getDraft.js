export default Drafts.createQuery("getDraft", {
  $filter({ filters, params }) {
    filters._id = params.draftId;
  },
  name: 1,
  participantIds: {
    name: 1,
  },
  pickIds: {
    userId: 1,
    pokemonId: 1,
  },
});
