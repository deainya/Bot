var TelegramBot = require('telegraf');
var Config      = require('./config');

var app         = new TelegramBot(Config.bot_token);

app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Да, давай начнём...');
  ctx.reply('Меня зовут c3po');
});

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой!');
});

app.startPolling();
