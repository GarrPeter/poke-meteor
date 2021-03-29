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
import { DraftSettings } from "./DraftSettings";

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
  const { picks, pickedPokemon, isPicksLoading } = useTracker(() => {
    const query = getPicksFromDraft.clone({ draftId });
    const handle = query.subscribe();

    if (!handle.ready) {
      return { picks: [], pickedPokemon: [], isPicksLoading: true };
    }
    const results = query.fetch();

    return {
      picks: results,
      pickedPokemon: results.map((e) => e.pokemonId),
    };
  }, [draftId]);
  const { pokemon, isPokemonLoading } = useTracker(() => {
    const noDataAvailable = { pokemon: [] };
    const handler = Meteor.subscribe("pokemon");

    if (!handler.ready) {
      return { ...noDataAvailable, isPokemonLoading: true };
    }

    const pokemon = PokemonCollection.find({}).fetch();

    return { pokemon };
  }, []);

  return (
    <>
      <h1>{isDraftLoading ? "" : draft.name}</h1>
      <button onClick={Meteor.call("drafts.start", draftId)}>Big Start</button>
      {isPicksLoading
        ? ""
        : picks.map((pick) => {
            if (pick.pokemonId) {
              return (
                <div key={pick._id}>
                  {pokemon.find((e) => e._id === pick.pokemonId)?.name} -{" "}
                  {users.find((e) => e._id === pick.userId)?.username}
                </div>
              );
            }
          })}
      {isDraftLoading ? (
        ""
      ) : (
        <>
          <DraftTimer draft={draft} />
          <DraftSettings draft={draft} />
        </>
      )}
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
      <div>
        {isPokemonLoading
          ? "Pokemon Loading"
          : pokemon
              .filter((mon) => pickedPokemon.indexOf(mon._id) == -1)
              .map((mon) => {
                return (
                  <Pokemon
                    clickHandler={makePick}
                    key={mon._id}
                    pokemon={mon}
                  />
                );
              })}
      </div>
    </>
  );
};
