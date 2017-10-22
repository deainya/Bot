var TelegramBot = require('telegraf');
var Config      = require('./config');

var app         = new TelegramBot(Config.bot_token);

app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Уже начинаем');
  ctx.reply('Я Алиса!');
});

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Пораскину мозгами чем тебе помочь');
});

app.startPolling();
