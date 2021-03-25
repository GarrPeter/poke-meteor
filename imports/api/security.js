export const checkLoggedIn = (call) => {
  if (!call.userId) {
    throw new Meteor.Error(`Not Authorized: ${call.userId}`);
  }
};
