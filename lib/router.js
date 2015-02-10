Router.map(function() {
  this.route("hipaaLogRoute", {
    path: "/audit", // path of your choosing
    template: "hipaaLogPage", // don't change this
    waitOn: function() { // only subscribes to the collection on this page
      return [
        Meteor.subscribe('hipaa'),
      ];
    },
    onBeforeAction: function () { // secures access to the page
      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        this.render("accessDenied");
      }else {
        this.next();
      }
    },
  });
});