import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/tasks/TasksCollection";
import { Pokemon } from "/imports/api/pokemon/PokemonCollection";
import pokedex from "/imports/api/pokemon/pokedex.js";
import { meteorAccounts } from "./setup_helpers";
import { initialize } from "meteor/herteby:graphical-grapher";
import "/imports/startup/server/index";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  initialize();
  //meteorAccounts();

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }

  if (Pokemon.find().count() === 0) {
    for (const [key, value] of Object.entries(pokedex)) {
      console.log(`${key} -> ${value}`);
      Meteor.call("pokemon.insert", {
        name: value.name,
        num: value.num,
        types: value.types,
        abilities: value.abilities,
        baseStats: {
          hp: value.baseStats.hp,
          atk: value.baseStats.atk,
          def: value.baseStats.def,
          spa: value.baseStats.spa,
          spd: value.baseStats.spd,
          spe: value.baseStats.spe,
        },
      });
    }
  }
});

/* {
  name,
  num,
  types,
  abilities,
  baseStats: { hp, attack, defense, specialAttack, specialDefense, speed },
} */
