'use strict'; //ECMAScript standard

const Telegraf = require('telegraf'); // telegraf lib
let Config     = require('./config'); // get config
let app        = new Telegraf(Config.bot_token);

app.command('start', (ctx) => {
  console.log('start', ctx.from)
  ctx.reply('Начнём...')
});
app.hears('Привет', (ctx) => ctx.reply('Привет!'));
app.on('sticker', (ctx) => ctx.reply('👍'));

app.startPolling();
