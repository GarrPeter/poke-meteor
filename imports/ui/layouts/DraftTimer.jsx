import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

export const DraftTimer = ({ draft }) => {
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
  const [round, setRound] = useState(
    Math.floor(draft.currentPick / draft.participantIds.length) + 1
  );
  return (
    <div className="draft-timer">
      {!draft.draftOrder || !draft.isRunning ? (
        ""
      ) : (
        <>
          <div className="timer">2:00</div>
          <div className="round">Round {round}</div>
          <div className="pick">
            Pick:
            {"" +
              draft.currentPick -
              (round - 1) * draft.participantIds.length +
              1}
          </div>
          <div className="current-pick">
            Currently Picking:
            {
              users.find((e) => e._id === draft.draftOrder[draft.currentPick])
                ?.username
            }
          </div>
        </>
      )}
    </div>
  );
};
