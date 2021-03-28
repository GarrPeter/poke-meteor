import React, { useState } from "react";
import { useParams } from "react-router";
import { useTracker } from "meteor/react-meteor-data";
import { Drafts } from "/imports/api/drafts/DraftsCollection";
import { Picks } from "/imports/api/drafts/picks/PicksCollection";
import { Pokemon } from "/imports/ui/components/Pokemon";
import { Pokemon as PokemonCollection } from "/imports/api/pokemon/PokemonCollection";
import { DraftTimer } from "/imports/ui/layouts/DraftTimer";
import getPicksFromDraft from "/imports/api/drafts/picks/queries/getPicks";
import getDraft from "/imports/api/drafts/queries/getDraft";

export const DraftDisplay = ({}) => {
  const { draftId } = useParams();

  const makePick = (e, mon) => {
    e.stopPropagation();
    console.log(mon);
    Meteor.call("drafts.makePick", { draftId, pokemon: mon });
  };

  const { draft, isDraftLoading } = useTracker(() => {
    const query = getDraft.clone({ draftId });
    const handle = query.subscribe();
    if (!handle.ready()) {
      return { draft: {}, isDraftLoading: true };
    }
    return { draft: query.fetchOne() };
  }, [draftId]);
  const { users, isUsersLoading } = useTracker(() => {
    const subscription = Meteor.subscribe("userList");
    if (!subscription.ready()) {
      return { users: [], isUsersLoading: !subscription.ready() };
    }
    const users = Meteor.users.find({}).fetch();
    return {
      users,
    };
  });
  const { pokemon, isPokemonLoading } = useTracker(() => {
    const noDataAvailable = { pokemon: [] };
    const handler = Meteor.subscribe("pokemon");

    if (!handler.ready) {
      return { ...noDataAvailable, isPokemonLoading: true };
    }

    const pokemon = PokemonCollection.find({}).fetch();

    return { pokemon };
  }, []);
  const { picks, isPicksLoading } = useTracker((draftId) => {
    const query = getPicksFromDraft.clone();
    const handle = query.subscribe();

    if (!handle.ready) {
      return { picks: [], isPicksLoading: true };
    }

    return {
      picks: query.fetch(),
    };
  }, []);

  return (
    <>
      <h1>{isDraftLoading ? "" : draft._id}</h1>
      {isPicksLoading
        ? ""
        : picks.map((pick) => {
            if (pick.pokemonId) {
              return <div key={pick._id}>{pick.pokemonId}</div>;
            }
          })}
      <DraftTimer />
      <div>
        {isPokemonLoading
          ? ""
          : pokemon.map((mon) => (
              <Pokemon clickHandler={makePick} key={mon._id} pokemon={mon} />
            ))}

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
          </div>
        ))}
      </div>
    </>
  );
};
