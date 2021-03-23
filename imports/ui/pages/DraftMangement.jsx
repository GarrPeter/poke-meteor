import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Drafts } from "/imports/api/drafts/DraftsCollection";
import { DraftDisplay } from "/imports/ui/layouts/DraftDisplay";
import {
  BrowserRouter,
  Switch,
  useRouteMatch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export const DraftManagement = ({ user, ...props }) => {
  const [name, setName] = useState("");
  const { path, url } = useRouteMatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) return;

    Meteor.call("drafts.insert", name);

    setName("");
  };

  const userFilter = user ? { userId: user._id } : {};

  const { drafts, isLoading } = useTracker(() => {
    const noDataAvailable = { drafts: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("drafts");

    if (!handler.ready) {
      return { ...noDataAvailable, isLoading: true };
    }

    const drafts = Drafts.find(userFilter, {
      sort: { createdAt: -1 },
    }).fetch();

    return { drafts };
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path={path} exact>
          <div className="drafts">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <button type="submit">Submit Draft</button>
            </form>
            {drafts.map((draft) => (
              <Fragment key={draft._id}>
                <Link to={`${path}/${draft._id}`}>{draft.name}</Link>
                <br />
              </Fragment>
            ))}
          </div>
        </Route>
        <Route path={`${path}/:draftId`}>
          <DraftDisplay />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
