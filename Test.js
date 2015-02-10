if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click #incrementButton': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'click #saveButton': function (evt, tmpl) {
        MyCollection.update({_id: this._id},{$set:{
          stared: true
        }}, function(error, result){
        if(error){
          HipaaLogger.logEvent("error", Meteor.userId(), Meteor.user().profile.name, "Forms", null, error);
        }
        if(result){
          HipaaLogger.logEvent("create", Meteor.userId(), Meteor.user().profile.name, "Forms", self._id, null);
        }
      });
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

