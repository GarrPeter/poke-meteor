import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { mockMethodCall } from "meteor/quave:testing";
import { assert } from "chai";
import { Drafts } from "/imports/api/drafts/DraftsCollection";
import "/imports/api/tasks/tasksMethods";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("methods", () => {
      const userId = Random.id();
      let draftId;
      beforeEach(() => {
        Drafts.remove({});
        draftId = Drafts.insert({
          //Put draft properties here
        });
      });
      /* it("can delete owned task", () => {
        mockMethodCall("tasks.remove", draftId, { context: { userId } });

        assert.equal(TasksCollection.find().count(), 0);
      });

      it(`can't delete task from another owner`, () => {
        const fn = () =>
          mockMethodCall("tasks.remove", draftId, {
            context: { userId: "somebody-else-id" },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(TasksCollection.find().count(), 1);
      });

      it(`can change the status of a task`, () => {
        const originalTask = TasksCollection.findOne(draftId);
        mockMethodCall("tasks.setIsChecked", draftId, !originalTask.isChecked, {
          context: { userId },
        });

        const updatedTask = TasksCollection.findOne(draftId);
        assert.notEqual(updatedTask.isChecked, originalTask.isChecked);
      });

      it("can insert new tasks", () => {
        const text = "New Task";
        mockMethodCall("tasks.insert", text, {
          context: { userId },
        });
        const tasks = TasksCollection.find({}).fetch();
        assert.equal(tasks.length, 2);
        assert.isTrue(tasks.some((task) => task.text === text));
      }); */
    });
  });
}
