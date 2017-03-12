//'use strict'; //ECMAScript standard
/* Наш бот будет уметь сказать есть ли определённая книга в школьной библиотеке
 * Ещё он сможет выводить расписание уроков на день
 * И чем вкусным сегодня угощают в столовой (а может быть что-то другое...)

 Вопросы на которые будет отвечать бот:
 1. Какое расписание на [сегодня/день недели/неделю]? --доработать: Какое расписание сегодя?
 1a. Покажи (всё) расписание (на) [сегодня/день недели/неделю]. --доработать: Покажи/выведи/напиши/напечатай/дай (всё) расписание
 1b. Какие предметы/уроки (в) [сегодня/день недели]?

 2. Во сколько начинаются/заканчиваются уроки (в) [сегодня/день недели]?
 3. Сколько/какое количество предметов/уроков (в) [сегодня/день недели]?
 4. Есть ли (у меня) [предмет] (в) [сегодня/день недели]?
 5. Во сколько (у меня) [предмет] (в) [сегодня/день недели]?

 * Изменения в расписании!
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

// Translate Day Of The Week (tdotw)
var tdotw = function(day_of_the_week) {
  var days = {"monday":"понедельник", "tuesday":"вторник", "wednesday":"среда", "thursday":"четверг", "friday":"пятница", "saturday":"суббота", "sunday":"воскресенье"};
  return days[day_of_the_week];
}

// "взять день расписания"
var getScheduleDay = function(day_of_the_week) {
  switch(day_of_the_week){
    case "monday":    var s = "понедельник:\n";
                      for ( var i = 0; i < schedule.monday.length; i++ ) {
                        s = s + schedule[day_of_the_week][i].time + ' ' + schedule[day_of_the_week][i].subject + '\n';
                      }
                      return s;
    case "tuesday":   var s = "вторник:\n ";
                      for ( var i = 0; i < schedule.tuesday.length; i++ ) {
                        s = s + schedule.tuesday[i].time + ' ' + schedule.tuesday[i].subject + '\n';
                      }
                      return s;
    case "wednesday": var s = "среду:\n";
                      for ( var i = 0; i < schedule.wednesday.length; i++ ) {
                        s = s + schedule.wednesday[i].time + ' ' + schedule.wednesday[i].subject + '\n';
                      }
                      return s;
    case "thursday":  var s = "четверг:\n";
                      for ( var i = 0; i < schedule.thursday.length; i++ ) {
                        s = s + schedule.thursday[i].time + ' ' + schedule.thursday[i].subject + '\n';
                      }
                      return s;
    case "friday":    var s = "пятницу:\n";
                      for ( var i = 0; i < schedule.friday.length; i++ ) {
                        s = s + schedule.friday[i].time + ' ' + schedule.friday[i].subject + '\n';
                      }
                      return s;
    case "saturday":   var s = "субботу:\n";
                      for ( var i = 0; i < schedule.saturday.length; i++ ) {
                        s = s + schedule.saturday[i].time + ' ' + schedule.saturday[i].subject + '\n';
                      }
                      return s;
    case "sunday":    return "воскресенье:\nБез уроков. Отдыхай, дружок :)";
    default:          return "";
  }
}

////////////////////////////////////////////////////////////////////////////////
// Задаём реакцию бота на текстовые сообщения
////////////////////////////////////////////////////////////////////////////////
app.on('text', function(ctx) {
  var txt = ctx.message.text.toLowerCase(); // Заглавные буквы свойства "text" из объекта контекста "ctx" делает маленткими

  var mon = /(понедельник|пн$|пн |пн.|пн,|пн?)/.test(txt);
  var tue =     /(вторник|вт$|вт |вт.|вт,|вт?)/.test(txt);
  var wed =       /(среда|ср$|ср |ср.|ср,|ср?)/.test(txt);
  var thu =     /(четверг|чт$|чт |чт.|чт,|чт?)/.test(txt);
  var fri =     /(пятница|пт$|пт |пт.|пт,|пт?)/.test(txt);
  var sat =     /(суббота|сб$|сб |сб.|сб,|сб?)/.test(txt);
  var sun = /(воскресенье|вс$|вс |вс.|вс,|вс?)/.test(txt);
  var day = /(день|сегодня)/.test(txt);
  var week = /(неделю)/.test(txt);

  var today = new Date(); // Сегодняшняя дата
  var Days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  var Day = Days[today.getDay()]; // Сегодняшний день недели
  var nDay = Days[(today.getDay()+1)%7]; // Завтра (next day)
  var nnDay = Days[(today.getDay()+2)%7]; // Послезавтра (next next day)
  // Переносим Вс. в хвост массива
  Days.splice(Days.indexOf("sunday"),1);
  Days.push("sunday");

  var Q1 = /расписание сегодня|расписание(?= на| в)|какие(?= предметы сегодня| уроки сегодня)|какие(?= предметы(?= в)| уроки(?= в))/.test(txt);
  //var Q2 = ;
  var Answer = "";

  console.log(txt); // Выводим в консоль значение переменной txt (текст сообщения пользователя), которая содержит значение свойства "text" (маленькие буквы) из объекта контекста "ctx" (контекст послания пользователя)

  if (Q1) {
    if (week) {
      var Answer = "Расписание на неделю...\n";
      for ( var i = 0; i < Days.length; i++ ) {
        Answer = Answer + getScheduleDay(Days[i]) + "\n";
      }
    } else {
      Days = [];
      if (mon||day&&Day==="monday"   ) { Days.push("monday");    }
      if (tue||day&&Day==="tuesday"  ) { Days.push("tuesday");   }
      if (wed||day&&Day==="wednesday") { Days.push("wednesday"); }
      if (thu||day&&Day==="thursday" ) { Days.push("thursday");  }
      if (fri||day&&Day==="friday"   ) { Days.push("friday");    }
      if (sat||day&&Day==="saturday" ) { Days.push("saturday");  }
      if (sun||day&&Day==="sunday"   ) { Days.push("sunday");    }

      if (Days.length > 0) {
        var Answer = "Вот расписание на ";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getScheduleDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, мастер Люк"; }
    }
    ctx.reply( Answer ); // Шлём готовый ответ пользователю
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
