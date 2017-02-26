//'use strict'; //ECMAScript standard

// Подключаем библиотеки и внешние скрипты
const TelegramBot = require('telegraf'); // telegraf library
var Config        = require('./config'); // get config

// Создаем объект приложения бота телеграмм
var app           = new TelegramBot(Config.bot_token);

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
app.hears('Привет', (ctx) => ctx.reply('Привет :)'));

// Это кривой callback функции
/*var s = function(a, b, function() {
  ctx = a+b;
  console.log(ctx);
  return ctx;
}){
  return null;
};*/

app.hears('1+2?', (ctx) => ctx.reply(s(a, b)));

// пробовали работать с расписанием...
//app.hears('Какое расписание на понедельник?', (ctx) => {
  // ctx.reply('Расписание на понедельник:');
  // ctx.reply(schedule.monday); //ой, не совсем то, что хотели...
//});

// Log сообщения
//app.on('message', (ctx) => {
//  console.log(ctx);
//  ctx.reply(ctx.message);
//});
// Задаём реакцию бота на стикеры и фото
//app.on('sticker', (ctx) => ctx.reply('👍'));
//app.on('photo', (ctx) => ctx.reply('👍 like :)'));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Алисины пробы пера - т.е. реакция бота на текстовое сообщение
//  var schedule = { monday :   [ {time:' 8:00', subject:'Музыка'},
//                                {time:' 8:45', subject:'Литература'},
//                                {time:' 9:40', subject:'Русский язык'},
//                                {time:'10:35', subject:'Русский язык'},
//                                {time:'11:30', subject:'Обществование'} ],
/*
tuesday:   [ {time:' 8:00', subject:'Технология'},
             {time:' 8:45', subject:'Технология'},
             {time:' 9:40', subject:'Иностранный язык'},
             {time:'10:35', subject:'Иностранный язык'},
             {time:'11:30', subject:'Русский язык'},
             {time:'12:20', subject:'Физкультура'},
             {time:'13:10', subject:'Литература'} ],*/
/*
1. Какое расписание на [день/сегодня]?
1a. Покажи расписание на [день/сегодня].
1b. Какие предметы/уроки [сегодня]?
1c. Какие предметы/уроки в [день]?
2. Во сколько начинаются/заканчиваются уроки [сегодня]?
2a. Во сколько начинаются/заканчиваются уроки в [день]?
3. Сколько/какое количество предметов/уроков [сегодня]?
3a. Сколько/какое количество предметов/уроков в [день]?
4. Покажи (всё) расписане (на неделю).
4a. Какое расписание на неделю?
5. Есть ли (у меня) [предмет] [сегодня]?
5a. Есть ли (у меня) [предмет] в [день]?
6. Во сколько (у меня) [предмет] [сегдоня]?
6a. Во сколько (у меня) [предмет] в [день]?
7. Изменения в расписании...
*/

app.on('text', function(ctx) {
  var mon = /(понедельник|пн.)/;
  var tue = /(вторник|вт.)/;
  var txt = ctx.message.text.toLowerCase(); // Заглавные буквы свойства "text" из объекта контекста "ctx" делает маленткими
  console.log(txt); // Выводим в консоль свойство "text" (уже маленькие буквы) из объекта контекста "ctx"

  if (mon.test(txt))
  {
    // Ниже выводим ответ бота на полученный контекст "ctx" от пользователя
    //ctx.reply( 'Расписание на понедельник:' + '\n' +
    //            JSON.stringify(schedule.monday) );//[0].time+' '+schedule.monday[0].subject) );
    // Теперь Алиса сделает цикл для понедельника


  } else if (tue.test(txt)) {

    // Тут папа сделал цикл
    var sch = 'Расписание на вторник:' + '\n'; // Задали начальное значение переменной sch: "Расписание на вторник:" (+ символ переноса строки)
    for ( i = 0; i < schedule.tuesday.length; i++ ) {
      sch = sch + schedule.tuesday[i].time + ' ' + schedule.tuesday[i].subject + '\n';
    }
    ctx.reply( sch ); // Это ответ пользователю

  } else {
    ctx.reply( 'Не понял вас, мастер Люк' ); //Скайвокер
  }

});
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  console.log(ctx);//  console.log('Идентификатор обновления (update_id): ' + ctx.update.update_id);//  console.log('Текст пользователя: ' + ctx.update.message.text);//  ctx.reply('Привет мир. Алиса молодец');

// Запускаем приложение бота
app.startPolling();

// Ниже примеры объектов
/* Библиотека: ['book':{'name':'Капитанская дочка', 'author':'Пушкин А. С.', 'amount':5}, 'student':{'name':'', 'till':''}]
 * Расписание: {'Пн':[{'time':'10:00', 'subject':'Математика'}, {'time':'10:45', 'subject':'Математика'}, ...]}
 * Столовая: меню, кол-во учеников
 * Перевод?
 */
