//'use strict'; //ECMAScript standard
/* Наш бот будет уметь сказать есть ли определённая книга в школьной библиотеке
 * Ещё он сможет выводить расписание уроков на день
 * И чем вкусным сегодня угощают в столовой (а может быть что-то другое...)

 Вопросы на которые будет отвечать бот:
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

 8. Как быть если указано несколько дней...

 */

////////////////////////////////////////////////////////////////////////////////
// Подключаем библиотеки и внешние скрипты
////////////////////////////////////////////////////////////////////////////////
var TelegramBot = require('telegraf'); // telegraf library
var Config      = require('./config'); // get config

////////////////////////////////////////////////////////////////////////////////
// Создаем объект приложения бота телеграмм
////////////////////////////////////////////////////////////////////////////////
var app         = new TelegramBot(Config.bot_token);

////////////////////////////////////////////////////////////////////////////////
// Объявляем переменные
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// Задаём реакцию бота на текстовые сообщения
////////////////////////////////////////////////////////////////////////////////
app.on('text', function(ctx) {
  var mon = /(понедельник|пн.)/;
  var tue = /(вторник|вт.)/;
  var wed = /(среда|ср.)/;
  var thu = /(четверг|чт.)/;
  var fri = /(пятница|пт.)/;
  var sat = /(суббота|сб.)/;
  var sun = /(воскресенье|вс.)/;
  var txt = ctx.message.text.toLowerCase(); // Заглавные буквы свойства "text" из объекта контекста "ctx" делает маленткими

  console.log(txt); // Выводим в консоль значение переменной txt, которая содержит значение свойства "text" (маленькие буквы) из объекта контекста "ctx"

  // Далее готовим ответ на полученный контекст "ctx" от пользователя
  // Ранее было так: ctx.reply( 'Расписание на понедельник:'+'\n'+JSON.stringify(schedule.monday) ); //[0].time+' '+schedule.monday[0].subject) );
  if (mon.test(txt)) {
    var sch = 'Расписание на понедельник:' + '\n'; // Задали начальное значение переменной sch: "Расписание на понедельник:" (+ символ переноса строки)
    // В цикле выводим расписание на понедельник
    for ( i = 0; i < schedule.monday.length; i++ ) {
      sch = sch + schedule.monday[i].time + ' ' + schedule.monday[i].subject + '\n';
    }
    ctx.reply( sch ); // Это ответ пользователю
  } else if (tue.test(txt)) {
    // Вторник
    var sch = 'Расписание на вторник:' + '\n';
    for ( i = 0; i < schedule.tuesday.length; i++ ) {
      sch = sch + schedule.tuesday[i].time + ' ' + schedule.tuesday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else if (wed.test(txt)) {
    // Среда
    var sch = 'Расписание на среду:' + '\n';
    for ( i = 0; i < schedule.wednesday.length; i++ ) {
      sch = sch + schedule.wednesday[i].time + ' ' + schedule.wednesday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else if (thu.test(txt)) {
    // Четверг
    var sch = 'Расписание на четверг:' + '\n';
    for ( i = 0; i < schedule.thursday.length; i++ ) {
      sch = sch + schedule.thursday[i].time + ' ' + schedule.thursday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else if (fri.test(txt)) {
    // Пятница
    var sch = 'Расписание на пятницу:' + '\n';
    for ( i = 0; i < schedule.friday.length; i++ ) {
      sch = sch + schedule.friday[i].time + ' ' + schedule.friday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else if (sat.test(txt)) {
    // Суббота
    var sch = 'Расписание на субботу:' + '\n';
    for ( i = 0; i < schedule.saturday.length; i++ ) {
      sch = sch + schedule.saturday[i].time + ' ' + schedule.saturday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else if (sun.test(txt)) {
    // Воскресенье
    var sch = 'Расписание на воскресенье:' + '\n';
    for ( i = 0; i < schedule.sunday.length; i++ ) {
      sch = sch + schedule.sunday[i].time + ' ' + schedule.sunday[i].subject + '\n';
    }
    ctx.reply( sch );
  } else {
    // Ответ бота, если день недели не был указан в сообщении
    ctx.reply( 'Не понял вас, мастер Люк' ); //Скайвокер
  }
});

////////////////////////////////////////////////////////////////////////////////
// Задаём реакцию бота на обязательные команды
////////////////////////////////////////////////////////////////////////////////
app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Да, давай начнём...');
  ctx.reply('Меня зовут c3po');
});

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой!');
});

////////////////////////////////////////////////////////////////////////////////
// Запускаем приложение бота
////////////////////////////////////////////////////////////////////////////////
app.startPolling();
