'use strict'; //ECMAScript standard

const TelegramBot = require('telegraf'); // telegraf library
let Config        = require('./config'); // get config
let app           = new TelegramBot(Config.bot_token);

/*app.getMe((res) => {
  console.log(res);
});
 */

/* Наш бот будет уметь сказать есть ли определённая книга в школьной библиотеке
 * Ещё он сможет выводить расписание уроков на день
 * И чем вкусным сегодня угощают в столовой (а может быть что-то другое...)
 */

var a = 1;
var b = 2;

app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Да, давай начнём...');
  ctx.reply('Меня зовут c3po');
});
app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой!');
});

app.hears('Привет', (ctx) => ctx.reply('Привет :)'));

app.hears('1+2?', (ctx) => ctx.reply(a+b));

app.on('sticker', (ctx) => ctx.reply('👍'));
app.on('photo', (ctx) => ctx.reply('👍 like :)'));

app.startPolling();

/* Библиотека: ['book':{'name':'Капитанская дочка', 'author':'Пушкин А. С.', 'amount':5}, 'student':{'name':'', 'till':''}]
 * Расписание: {'Пн':[{'time':'10:00', 'subject':'Математика'}, {'time':'10:45', 'subject':'Математика'}, ...]}
 * Столовая: меню, кол-во учеников
 * Перевод?
 */
