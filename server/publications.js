Meteor.publish('hipaa', function () {
  return Hipaa.find();
  }
);