'use strict'; //ECMAScript standard

// Подключаем библиотеки и внешние скрипты
const TelegramBot = require('telegraf'); // telegraf library
let Config        = require('./config'); // get config

// Создаем объект приложения бота телеграмм
let app           = new TelegramBot(Config.bot_token);

/*app.getMe((res) => {
  console.log(res);
});
 */

/* Наш бот будет уметь сказать есть ли определённая книга в школьной библиотеке
 * Ещё он сможет выводить расписание уроков на день
 * И чем вкусным сегодня угощают в столовой (а может быть что-то другое...)
 */

// Объявляем переменные
var a = 1;
var b = 2;
var schedule = { monday :[{time:'10:00', subject:'Математика'},{time:'10:50', subject:'Музыка'}],
                 tuesday:[]
                 //...тут напишет Алиса
               };

// Задаём реакцию бота на команды
app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Да, давай начнём...');
  ctx.reply('Меня зовут c3po');
});
app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой!');
});

// Задаём реакцию бота на текстовые сообщения
app.hears('Привет', (ctx) => ctx.reply('Привет :)'));
app.hears('1+2?', (ctx) => ctx.reply(a+b));

// ... работаем с расписанием...
app.hears('Какое расписание на понедельник?', (ctx) => {
  ctx.reply('Расписание на понедельник:');
  ctx.reply(schedule.monday); //ой, не совсем то, что хотели...

  ctx.reply('Первый предмет в понедельник:');
  ctx.reply(schedule.monday[0].time + ' ' + schedule.monday[0].subject);

});

// ...тут напишет Алиса
app.on('sticker', (ctx) => ctx.reply('👍'));
app.on('photo', (ctx) => ctx.reply('👍 like :)'));

// Запускаем приложение бота
app.startPolling();

// Ниже примеры объектов
/* Библиотека: ['book':{'name':'Капитанская дочка', 'author':'Пушкин А. С.', 'amount':5}, 'student':{'name':'', 'till':''}]
 * Расписание: {'Пн':[{'time':'10:00', 'subject':'Математика'}, {'time':'10:45', 'subject':'Математика'}, ...]}
 * Столовая: меню, кол-во учеников
 * Перевод?
 */
