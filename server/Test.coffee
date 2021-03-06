#//////////////////////////////////////////////////////////////////
# Startup
#
Meteor.startup ->

  #//////////////////////////////////////////////////////////////////
  # Create Test Secrets
  #
  if Meteor.secrets.find().fetch().length is 0
    Meteor.secrets.insert secret: "ec2 password: apple2"
    Meteor.secrets.insert secret: "domain registration pw: apple3"

  #//////////////////////////////////////////////////////////////////
  # Create Test Users
  #
  if Meteor.users.find().fetch().length is 0
    console.log "Creating users: "
    users = [
      name: "Normal User"
      email: "normal@example.com"
      roles: []
    ,
      name: "View-Secrets User"
      email: "view@example.com"
      roles: [ "view-secrets" ]
    ,
      name: "Manage-Users User"
      email: "manage@example.com"
      roles: [ "manage-users" ]
    ,
      name: "Admin User"
      email: "admin@example.com"
      roles: [ "admin" ]
     ]
    _.each users, (userData) ->
      id = undefined
      user = undefined
      console.log userData
      id = Accounts.createUser(
        email: userData.email
        password: "apple1"
        profile:
          name: userData.name
      )

      # email verification
      Meteor.users.update
        _id: id
      ,
        $set:
          "emails.0.verified": true

      Roles.addUsersToRoles id, userData.roles


  #//////////////////////////////////////////////////////////////////
  # Prevent non-authorized users from creating new users
  #
  Accounts.validateNewUser (user) ->
    loggedInUser = Meteor.user()
    return true  if Roles.userIsInRole(loggedInUser, [ "admin", "manage-users" ])
    throw new Meteor.Error(403, "Not authorized to create new users")



#//////////////////////////////////////////////////////////////////
# Publish
#

# Authorized users can view secrets
Meteor.publish "secrets", ->
  user = Meteor.users.findOne(_id: @userId)
  if Roles.userIsInRole(user, [ "admin", "view-secrets" ])
    console.log "publishing secrets", @userId
    return Meteor.secrets.find()
  @stop()
  return


# Authorized users can manage user accounts
Meteor.publish "users", ->
  user = Meteor.users.findOne(_id: @userId)
  if Roles.userIsInRole(user, [ "admin", "manage-users" ])
    console.log "publishing users", @userId
    return Meteor.users.find({},
      fields:
        emails: 1
        profile: 1
        roles: 1
    )
  @stop()
  return