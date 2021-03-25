import React, { Fragment, useState } from "react";
import Router, { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/tasks/TasksCollection";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";
import { LoginForm } from "./components/LoginForm";
import { DraftManagement } from "./pages/DraftMangement";
import { Pokemon } from "/imports/ui/components/Pokemon";

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);
};

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>📝️ Do Me{pendingTasksTitle}</h1>
            </div>
          </div>
        </header>

        <div className="main">
          {user ? (
            <>
              <div className="user" onClick={logout}>
                {user.username} 🚪
              </div>
              <Switch>
                <Route path="/drafts">
                  <DraftManagement user={user} />
                </Route>
                <Route path="/todos">
                  <TaskForm />
                  <div className="filter">
                    <button onClick={() => setHideCompleted(!hideCompleted)}>
                      {hideCompleted ? "Show All" : "Hide Completed"}
                    </button>
                  </div>

                  {isLoading && <div className="loading">loading...</div>}

                  <ul className="tasks">
                    {tasks.map((task) => (
                      <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                      />
                    ))}
                  </ul>
                </Route>
                {/* Default list goes at the bottom. Cause Switch. */}
                <Route path="/">
                  <Link to="/drafts">Draft List</Link>
                </Route>
              </Switch>
            </>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};
