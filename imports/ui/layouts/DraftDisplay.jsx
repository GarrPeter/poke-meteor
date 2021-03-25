import React from "react";
import { useParams } from "react-router";
import { useTracker } from "meteor/react-meteor-data";
import { Drafts } from "/imports/api/drafts/DraftsCollection";
import { Pokemon } from "/imports/ui/components/Pokemon";
import { DraftTimer } from "/imports/ui/layouts/DraftTimer";
// import getPicksFromDraft from "/imports/api/drafts/picks/queries/getPicks";

const draftSubscription = (draftId) =>
  useTracker(() => {
    const subscription = Meteor.subscribe("drafts", draftId);
    return !subscription.ready();
  }, [draftId]);

const getDraft = (draftId) =>
  useTracker(() => Drafts.findOne(draftId), [draftId]);

const userSubscription = () => {
  const subscription = Meteor.subscribe("userList");
  return !subscription.ready();
};
const getUserList = () => {
  return Meteor.users.find({});
};

/* createContainer(({ draftId }) => {
  const query = getPicksFromDraft.clone({ draftId });
  const handle = query.subscribe();

  return {
    ready: handle.ready(),
    picks: query.fetch(),
  };
}); */

export const DraftDisplay = ({}) => {
  const { draftId } = useParams();
  const isLoading = draftSubscription(draftId) || userSubscription();
  const draft = getDraft(draftId);
  const users = getUserList();
  const pokemonId = "123";

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>{draft._id}</h1>
      <DraftTimer />
      <div>
        <Pokemon />
        <Pokemon />
        <Pokemon />
        <Pokemon />
        <Pokemon />
        <Pokemon />
        <Pokemon />
        {users.map((user) => (
          <div key={user._id}>
            {!draft.participantIds?.includes(user._id) ? (
              <button
                onClick={(e) => {
                  e.stopPropagation;
                  Meteor.call("drafts.addParticipant", user._id, draftId);
                }}
              >
                Add
              </button>
            ) : (
              ""
            )}
            {user.username}
            <button
              onClick={(e) => {
                e.stopPropagation;
                Meteor.call("drafts.makePick", { draftId, pokemonId });
              }}
            >
              Make Pick
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
