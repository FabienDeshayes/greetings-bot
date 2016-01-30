var SlackBot = require('slackbots')
  , config = require('./config')
  , onMessage = require('./channel-join')
  , botParams = require('./bot-params')
 
var bot = new SlackBot({
  token: process.env['SLACK_GREETINGS_BOT_TOKEN']
, name: process.env['SLACK_GREETINGS_BOT_NAME']
})

bot.on('start', function() {
  if (config.welcomeMessage) {
    bot.postMessageToChannel(config.welcomeMessage.channel, config.welcomeMessage.text, botParams)
  }

  bot.on('message', function(msg) {
    onMessage(msg, bot)
  })
})