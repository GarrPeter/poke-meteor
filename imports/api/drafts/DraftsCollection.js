import { Mongo } from "meteor/mongo";
import { User } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const Drafts = new Mongo.Collection("drafts");
Drafts.schema = new SimpleSchema({
  name: { type: String },
  userId: { type: String },
  participantIds: [String],
});

export { Drafts };

/* const draft = {
    name: 'My list',
    participants: 3
  };
  
  Drafts.schema.validate(draft); */

/*
 cultofcoders:grapher  
Configure how collections relate to each other
Todos.addLinks({
  list: {
    type: 'one',
    field: 'listId',
    collection: Lists
  }
});

Lists.addLinks({
  todos: {
    collection: Todos,
    inversedBy: 'list' // This represents the name of the link we defined in Todos
  }
});

// With Grapher you must always specify the fields you want
const listsAndTodos = Lists.createQuery({
  name: 1,
  todos: {
      text: 1
  }
}).fetch();
*/
