import React from "react";
import { useParams } from "react-router";
import { useTracker } from "meteor/react-meteor-data";
import { Drafts } from "/imports/api/drafts/DraftsCollection";

const useDraftSubscription = (draftId) =>
  useTracker(() => {
    const subscription = Meteor.subscribe("drafts", draftId);
    return !subscription.ready();
  }, [draftId]);

const useDraft = (draftId) =>
  useTracker(() => Drafts.findOne(draftId), [draftId]);

export const DraftDisplay = ({}) => {
  const { draftId } = useParams();
  const isLoading = useDraftSubscription(draftId);
  const draft = useDraft(draftId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{draft._id}</div>;
};
