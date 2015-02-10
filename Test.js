if (Meteor.isClient) {
  // counter starts at 0
  Meteor.subscribe("posts");

  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    // 'click #incrementButton': function () {
    //   // increment the counter when button is clicked
    //   Session.set('counter', Session.get('counter') + 1);
    // },
    'click #saveButton': function (evt, tmpl) {
      console.log("batman")
      // Posts.update({_id: this._id},{$set:{
      //   stared: true
      // }}, function(error, result){
      // if(error){
      //   HipaaLogger.logEvent("error", Meteor.userId(), Meteor.user().profile.name, "Forms", null, error);
      //   console.log("Bad")
      // }
      // if(result){
      //   HipaaLogger.logEvent("create", Meteor.userId(), Meteor.user().profile.name, "Forms", self._id, null);
      //   console.log("Good");
      // }
      // console.log("Got through me")
    // });
    }
  });

}

if (Meteor.isServer) {
  Posts = new Meteor.Collection("posts");
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('posts', function () {
    return Posts.find()
  });
}

