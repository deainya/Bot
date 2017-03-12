// Подключаем библиотеки и внешние скрипты
var TelegramBot = require('telegraf'); // telegraf library
var Config      = require('./config'); // get config

// Так выглядит библиотека изнутри
/*
  telegraf.js:
  module.exports(id) = {
    identity: id,
    hears(){
      ...
      return ...
    },
    on(){
      ...
      return ...
    },
    ...
  }
*/
// В ней есть переменные и функции

// Создаем объект приложения бота телеграмм
var app         = new TelegramBot(Config.bot_token);

// Примеры описания объектов
/* Библиотека: ['book':{'name':'Капитанская дочка', 'author':'Пушкин А. С.', 'amount':5}, 'student':{'name':'', 'till':''}]
 * Расписание: {'Пн':[{'time':'10:00', 'subject':'Математика'}, {'time':'10:45', 'subject':'Математика'}, ...]}
 * Столовая: меню, кол-во учеников
 */

//Объявляем переменные
var a = 1;
var b = 2;

// Задаём реакцию бота на текстовые сообщения
app.hears('Привет', (ctx) => ctx.reply('Привет :)'));
app.hears('1+2?', (ctx) => ctx.reply(s(a, b)));

// Это кривой callback функции
/*var s = function(a, b, function() {
  ctx = a+b;
  console.log(ctx);
  return ctx;
}){
  return null;
};*/

// Попробовали работать с расписанием...
app.hears('Какое расписание на понедельник?', (ctx) => {
   ctx.reply('Расписание на понедельник:');
   //ctx.reply(schedule.monday); //ой, не совсем то, что хотели...
});

// Задаём реакцию бота на стикеры и фото
app.on('sticker', (ctx) => ctx.reply('👍'));
app.on('photo', (ctx) => ctx.reply('👍 like :)'));

// Log сообщения
app.on('text', (ctx) => {
  console.log(ctx);
  //console.log('Идентификатор обновления (update_id): ' + ctx.update.update_id);
  //console.log('Текст пользователя: ' + ctx.update.message.text);
  //ctx.reply('Привет мир. Алиса молодец');
  ctx.reply(ctx.message);
});

// Задаём реакцию бота на обязательные команды
app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Да, давай начнём...');
  ctx.reply('Меня зовут c3po');
});

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой!');
});

// Запускаем приложение бота
app.startPolling();
