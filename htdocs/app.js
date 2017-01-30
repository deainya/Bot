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
var schedule = { monday :   [ {time:' 8:00', subject:'Музыка'},
                              {time:' 8:45', subject:'Литература'},
                              {time:' 9:40', subject:'Русский язык'},
                              {time:'10:35', subject:'Русский язык'},
                              {time:'11:30', subject:'Обществование'} ],
                 tuesday:   [ {time:' 8:00', subject:'Технология'},
                              {time:' 8:45', subject:'Технология'},
                              {time:' 9:40', subject:'Иностранный язык'},
                              {time:'10:35', subject:'Иностранный язык'},
                              {time:'11:30', subject:'Русский язык'},
                              {time:'12:20', subject:'Физкультура'},
                              {time:'13:10', subject:'Литература'} ],
                 wednesday: [ {time:' 8:00', subject:'Диз.ОПМ'},
                              {time:' 8:45', subject:'Диз.ОПМ'},
                              {time:' 9:40', subject:'Ист. иск.'},
                              {time:'10:35', subject:'Ритмика'},
                              {time:'11:30', subject:'История'},
                              {time:'12:20', subject:'История'},
                              {time:'13:10', subject:'Математика'} ],
                 thursday:  [ {time:' 8:00', subject:'ОДНКНР'},
                              {time:' 8:45', subject:'Русский язык'},
                              {time:' 9:35', subject:'Русский язык'},
                              {time:'10:25', subject:'Литература'},
                              {time:'11:15', subject:'География'},
                              {time:'12:00', subject:'Иностранный язык'},
                              {time:'12:45', subject:'Биология'} ],
                 friday:    [ {time:' 8:00', subject:'Проектная графика'},
                              {time:' 8:45', subject:'Цветоведение'},
                              {time:' 9:40', subject:'Математика'},
                              {time:'10:35', subject:'Математика'},
                              {time:'11:30', subject:'Физкультура'},
                              {time:'12:20', subject:'ВД Прав.'} ],
                 saturday:  [ {time:' 8:00', subject:'ВД МПИ'},
                              {time:' 8:45', subject:'ВД МПИ'},
                              {time:' 9:40', subject:'Математика'},
                              {time:'10:35', subject:'Математика'},
                              {time:'11:30', subject:'Ритмика'} ],
                 sunday:    []
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

  ctx.reply ( 'Первый предмет в понедельник:' + '\n' +
              schedule.monday[0].time + ' ' + schedule.monday[0].subject
            );
});

// Задаём реакцию бота на стикеры и фото
app.on('sticker', (ctx) => ctx.reply('👍'));
app.on('photo', (ctx) => ctx.reply('👍 like :)'));

app.on('text', (ctx) => {
  console.log(ctx.message.text + ' хммм...');
  ctx.reply(ctx.message.text + ' хммм...');
});

app.on('message', (ctx) => {
  console.log(ctx.message);
  ctx.reply(ctx.message);
});

// Запускаем приложение бота
app.startPolling();

// Ниже примеры объектов
/* Библиотека: ['book':{'name':'Капитанская дочка', 'author':'Пушкин А. С.', 'amount':5}, 'student':{'name':'', 'till':''}]
 * Расписание: {'Пн':[{'time':'10:00', 'subject':'Математика'}, {'time':'10:45', 'subject':'Математика'}, ...]}
 * Столовая: меню, кол-во учеников
 * Перевод?
 */
