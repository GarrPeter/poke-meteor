import { check } from "meteor/check";
import {
  Drafts,
  draftSettingsSchema,
} from "/imports/api/drafts/DraftsCollection";
import { Picks } from "/imports/api/drafts/picks/PicksCollection";
import * as Security from "/imports/api/security";
import DraftOrderEnum from "./enums/DraftOrderEnum";

Meteor.methods({
  "drafts.insert"(name) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    Drafts.insert({
      name,
      createdAt: new Date(),
      userId: this.userId,
      participantIds: [],
      isRunning: false,
      draftOrder: [],
      currentPick: -1,
      settings: {
        draftOrder: DraftOrderEnum.SNAKE,
        numberRounds: 2,
        minutesToPick: 2,
      },
    });
  },
  "drafts.remove"(draftId) {
    check(draftId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error("Access denied");
    }

    Drafts.remove(draftId);
  },
  "drafts.addParticipant"(userId, draftId) {
    check(userId, String);
    check(draftId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error("Access denied.");
    }

    Drafts.update(draftId, {
      $push: {
        participantIds: userId,
      },
    });
  },
  "drafts.setSettings"(draftId, settings) {
    check(draftId, String);

    draftSettingsSchema.validate(settings);
    Security.checkLoggedIn(this);

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error(
        "Draft not found. Doesn't exist or you may not be the draft owner."
      );
    }

    Drafts.update(draftId, {
      $set: {
        settings: settings,
      },
    });
  },
  "drafts.generateDraftOrder"({ draftId }) {
    check(draftId, String);

    Security.checkLoggedIn(this);

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });

    if (!draft) {
      throw new Meteor.Error("Access denied.");
    }

    if (draft.participantIds.length === 0) {
      throw new Meteor.Error("Draft must have participants");
    }
    let draftOrder = [];
    switch (draft.settings.draftOrder) {
      case DraftOrderEnum.SNAKE:
        const tempParticipants = draft.participantIds;
        const reverseParticipants = tempParticipants.slice().reverse();
        for (let i = 0; i < draft.settings.numberRounds; i++) {
          if (i % 2 == 0) {
            draftOrder = draftOrder.concat(tempParticipants);
          } else {
            draftOrder = draftOrder.concat(reverseParticipants);
          }
        }
        break;
      default:
        break;
    }

    Drafts.update(draftId, {
      $set: {
        draftOrder: draftOrder,
      },
    });
  },
  "drafts.start"(draftId) {
    check(draftId, String);
    Security.checkLoggedIn(this);

    const draft = Drafts.findOne({
      _id: draftId,
      userId: this.userId,
    });
    if (!draft) {
      throw new Meteor.Error(
        "Draft not found. Doesn't exist or you may not be the draft owner."
      );
    }
    if (draft.draftOrder.length <= 0) {
      throw new Meteor.Error(
        "Cannot draft without a draft order. Please generate one."
      );
    }
    const currPick = draft.currentPick === -1 ? 0 : draft.currentPick;
    Drafts.update(draftId, {
      $set: {
        currentPick: currPick,
        isRunning: true,
      },
    });
  },
  "drafts.pause"({ draftId }) {
    check(draftId, String);
    Security.checkLoggedIn(this);

    const draft = Drafts.findOne({
      _id: draftId,
    });
    if (!draft) {
      throw new Meteor.Error("Draft not found.");
    }
    Drafts.update(draftId, {
      $set: {
        isRunning: false,
      },
    });
  },
  "drafts.makePick"({ draftId, pokemon }) {
    check(draftId, String);
    check(pokemon._id, String);

    Security.checkLoggedIn(this);

    const draft = Drafts.findOne({
      _id: draftId,
    });
    if (!draft) {
      throw new Meteor.Error("Draft not found.");
    }
    if (!draft.isRunning) {
      throw new Meteor.Error("Draft is not currently running.");
    }
    if (draft.currentPick >= draft.draftOrder.length) {
      Drafts.update(draftId, {
        $set: {
          isRunning: false,
        },
      });
    }
    if (draft.draftOrder[draft.currentPick] != this.userId) {
      throw new Meteor.Error("It is not currently your pick.");
    }
    const pick = {
      userId: this.userId,
      draftId: draftId,
      pokemonId: pokemon._id,
      createdAt: new Date(),
    };
    Picks.insert(pick);

    Drafts.update(draftId, {
      $set: {
        currentPick: draft.currentPick + 1,
      },
    });
    if (draft.currentPick + 1 >= draft.draftOrder.length) {
      Drafts.update(draftId, {
        $set: {
          isRunning: false,
        },
      });
    }
  },
});
