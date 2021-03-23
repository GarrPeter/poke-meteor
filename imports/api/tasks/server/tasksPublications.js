import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasks/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
