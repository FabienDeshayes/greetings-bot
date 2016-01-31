var SlackBot = require('slackbots')
  , config = require('./config')
  , botParams = require('./bot-params')
 
var bot = new SlackBot({
  token: process.env['SLACK_GREETINGS_BOT_TOKEN']
, name: process.env['SLACK_GREETINGS_BOT_NAME']
})

var messageHandlers = [
  require('./handlers/channel-join')
]

bot.on('start', function() {
  if (config.welcomeMessage) {
    bot
      .postMessageToChannel(config.welcomeMessage.channel, config.welcomeMessage.text, botParams)
      .fail(function(error) {
        console.log('Error while posting welcome message', error)
      })
  }

  bot.on('message', function(msg) {
    messageHandlers.map(function(handler) {handler(msg, bot)})
  })
})