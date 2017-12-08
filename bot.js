if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('botkit');
var figlet = require('figlet');

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.token,
  retry: true
}).startRTM(function(error){
  if(error){
    throw new Error(error);
  }
});

controller.hears('(.*)', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
  let msg = message.match[1]
  var fig = figlet.textSync(msg)
  bot.reply(message, '```' + fig + '```');
});
