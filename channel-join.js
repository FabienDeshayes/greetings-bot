var botParams = require('./bot-params')

function findUser(id, bot) {
  return bot.getUsers().then(function(users) {
    // TODO: use functional syntax to retrieve user name

    if (users && users.members) {
      for (var i = 0 ; i < users.members.length ; i++) {
        var user = users.members[i]
        if (user.id === id) { return user }
      }
    }
    console.log('Could not find user with id', id, 'in users of the channel')
    return null
  })
}


module.exports = function(msg, bot) {
  if (msg.type === 'message' && msg.subtype === 'channel_join') {
      console.log('User joined channel:', msg.user)

      findUser(msg.user, bot).then(function(user) {
        console.log('Sending greetings to', user.name)
        bot.postMessageToUser(user.name, 'All the info you\'ve ever dreamed of!', botParams)
      })
    }
}