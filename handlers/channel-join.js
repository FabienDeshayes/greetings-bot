var botParams = require('../bot-params')
  , esportsGreetings = require('../greetings/esports-vision')

function findUser(id, bot) {
  return bot.getUsers().then(function(users) {

    if (users && users.members) {
      for (var i = 0 ; i < users.members.length ; i++) {
        var user = users.members[i]
        if (user.id === id) {
          console.log('Mapped used with id', user.id, 'to name', user.name)
          return user
        }
      }
    }
    console.error('Could not find user with id', id, 'in users of the channel')
    return null
  })
}


module.exports = function(msg, bot) {
  if (msg.type === 'message' && msg.subtype === 'channel_join') {
      console.log('User', msg.user, 'joined channel')

      findUser(msg.user, bot).then(function(user) {
        if (!user) return
        console.log('Sending greetings to', user.name)
        var greetings = esportsGreetings.replace('%USER%', user.name)
        bot
          .postMessageToUser(user.name, greetings, botParams)
          .fail(function(error) {
            console.error('Error while sending greetings to user', user.name, ':', error)
          })
      })
    }
}