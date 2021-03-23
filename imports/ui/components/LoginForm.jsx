import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  const createAccount = (e) => {
    e.preventDefault();

    Accounts.createUser({ username, password });
  };

  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign In</button>
      <button onClick={createAccount}>Create Account</button>
    </form>
  );
};
