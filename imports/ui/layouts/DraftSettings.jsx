import React, { useState } from "react";
import _ from "underscore";
import { DraftOrderDisplay } from "./DraftOrderDisplay";
import DraftOrderEnum from "/imports/api/drafts/enums/DraftOrderEnum";

export const DraftSettings = ({ draft }) => {
  const [numberRounds, setNumberRounds] = useState(0);
  const [draftOrder, setDraftOrder] = useState(
    draft.settings ? draft.settings.draftOrder : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numberRounds) return;

    Meteor.call("drafts.setSettings", draft._id, {
      draftOrder,
      numberRounds,
      minutesToPick: 0,
    });
  };

  const updateNumberRounds = (e) => {
    const num = e.target.value;
    if (num != "") {
      setNumberRounds(parseInt(e.target.value));
    } else {
      setNumberRounds("");
    }
  };
  return (
    <div className="draft-settings">
      <h1>Settings</h1>
      <div className="draft-name">Draft Name</div>
      <form className="draft-settings-form" onSubmit={handleSubmit}>
        <p>Number Rounds</p>
        <input
          type="number"
          value={numberRounds}
          onChange={updateNumberRounds}
        />
        <p>Draft Order</p>
        <select
          name="draft-order"
          defaultValue={draftOrder}
          onChange={(e) => setDraftOrder(e.target.value)}
        >
          {_.values(DraftOrderEnum).map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
          <option>Snake</option>
        </select>

        <button type="submit">Update Settings</button>
      </form>
      <button
        onClick={(e) =>
          Meteor.call("drafts.generateDraftOrder", { draftId: draft._id })
        }
      >
        Generate Draft order
      </button>
      <DraftOrderDisplay order={draft.draftOrder} />
    </div>
  );
};
