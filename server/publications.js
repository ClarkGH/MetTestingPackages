Meteor.publish('hipaa', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Hipaa.find();
  }else{
    return []; // won't publish a thing if the user doesn't have the right role
  }
});