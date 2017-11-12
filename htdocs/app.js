// Подключаем библиотеки и внешние скрипты
var TelegramBot = require('telegraf');
var Config      = require('./config');

// Создаем объект приложения бота телеграмм
var app         = new TelegramBot(Config.bot_token);

var menu = {     monday :   [ {dish:'Борщ'},
                              {dish:'Рыбная запеканка'},
                              {dish:'Компот из шиповника'}],
                 tuesday:   [ {dish:'Гороховый суп'},
                              {dish:'Жаренный картофель'},
                              {dish:'Сок'}],
                 wednesday: [ {dish:'Суп с пельменями'},
                              {dish:'Макароны с котлетой'},
                              {dish:'Морс'}],
                 thursday:  [ {dish:'Рыбный суп'},
                              {dish:'Гороховое пюре с сосиской'},
                              {dish:'Сок'}],
                 friday:    [ {dish:'Щи'},
                              {dish:'Гречка с гуляшом'},
                              {dish:'Компот из шиповника'}],
                 saturday:  [],
                 sunday:    []
               };

// Translate Day Of The Week (tdotw)
var tdotw = function(day_of_the_week) {
  var days = {"monday":"понедельник", "tuesday":"вторник", "wednesday":"среда", "thursday":"четверг", "friday":"пятница", "saturday":"суббота", "sunday":"воскресенье"};
  return days[day_of_the_week];
}

// "взять день меню"
var getMenuDay = function(day_of_the_week) {
  console.log("я в функции");
  switch(day_of_the_week) {
    case "monday":    var s = "понедельник:\n"; // case- случай, switch- переключать,length-длина, default- по умолчанию
                      for ( var i = 0; i < menu.monday.length; i++ ) {
                        s = s + menu[day_of_the_week][i].dish + '\n';
                      }
                      return s;
    case "tuesday":   var s = "вторник:\n ";
                      for ( var i = 0; i < menu.tuesday.length; i++ ) {
                        s = s + menu[day_of_the_week][i].dish +'\n';
                      }
                      return s;
    case "wednesday": var s = "среда:\n";
                      for ( var i = 0; i < menu.wednesday.length; i++ ) {
                        s = s + menu[day_of_the_week][i].dish +'\n';
                      }
                      return s;
    case "thursday":  var s = "четверг:\n";
                      for ( var i = 0; i < menu.thursday.length; i++ ) {
                        s = s + menu[day_of_the_week][i].dish + '\n';
                      }
                      return s;
    case "friday":    var s = "пятницу:\n";
                      for ( var i = 0; i < menu.friday.length; i++ ) {
                        s = s + menu[day_of_the_week][i].dish +'\n';
                      }
                      return s;
    case "saturday":  return "суббота:\nНе кормят...Печалька";
    case "sunday":    return "воскресенье:\nНе кормят...Печалька";
    default:          return "";
  }
}

app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Уже начинаем');
  ctx.reply('Я Алиса!');
});

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Пораскину мозгами чем тебе помочь');
});

app.on('text', function(ctx) {
  var txt = ctx.message.text.toLowerCase(); // Заглавные буквы свойства "text" из объекта контекста "ctx" делает маленькими
  console.log(txt); // Выводим в консоль значение переменной txt (текст сообщения пользователя), которая содержит значение свойства "text" (маленькие буквы) из объекта контекста "ctx" (контекст послания пользователя)

  var mon =     /(понедельник|пн.|пн$)/.test(txt);
  var tue =         /(вторник|вт.|вт$)/.test(txt);
  var wed =     /(среда|среду|ср.|ср$)/.test(txt);
  var thu =         /(четверг|чт.|чт$)/.test(txt);
  var fri = /(пятница|пятницу|пт.|пт$)/.test(txt);
  var sat = /(суббота|субботу|сб.|сб$)/.test(txt);
  var sun =     /(воскресенье|вс.|вс$)/.test(txt);
  var day = /(день|сегодня)/.test(txt);
  var week = /(неделю)/.test(txt);

  var today = new Date(); // Сегодняшняя дата
  var Days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  var Day = Days[today.getDay()]; // Сегодняшний день недели (today.getDay() возвращает значение от 0 до 6)
  // Переносим Вс. в хвост массива
  Days.splice(Days.indexOf("sunday"),1); // Удаляем элемент с названием Вс.: indexOf - индекс элемента; splice(index, cnt) удалить элементы начиная с индекса index в количестве cnt
  Days.push("sunday"); // Добавляем элемент в хвост массива

  if (day) {
    ctx.reply( getMenuDay(Day) );
  } else if (mon) {
    ctx.reply( 'Тут должно быть что-то про понедельник' );
  } else {
    ctx.reply( 'Ой' );
  }

/*
  var today = new Date(); // Сегодняшняя дата
  var Days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  var Day = Days[today.getDay()]; // Сегодняшний день недели (today.getDay() возвращает значение от 0 до 6)
  // Переносим Вс. в хвост массива
  Days.splice(Days.indexOf("sunday"),1); // Удаляем элемент с названием Вс.: indexOf - индекс элемента; splice(index, cnt) удалить элементы начиная с индекса index в количестве cnt
  Days.push("sunday"); // Добавляем элемент в хвост массива

  //1. Какое расписание на [сегодня/день недели/неделю]? ++доработано: Какое расписание сегодя?
  //1a. Покажи (всё) расписание (на) [сегодня/день недели/неделю]. --доработать: Покажи/выведи/напиши/напечатай/дай (всё) расписание
  //1b. Какие предметы/уроки (в) [сегодня/день недели]?
  var Q1 = /расписание сегодня|расписание(?= на| в)|какие(?= предметы сегодня| уроки сегодня)|какие(?= предметы(?= в)| уроки(?= в))/.test(txt);
  //2. Во сколько начинаются/заканчиваются уроки (в) [сегодня/день недели]?
  var Q21 = /во сколько начинаются(?= уроки(?= | в)| предметы(?= | в)| занятия(?= | в))/.test(txt);
  var Q22 = /во сколько заканчиваются(?= уроки(?= | в)| предметы(?= | в)| занятия(?= | в))/.test(txt);
  //3. Сколько/какое количество предметов/уроков (в) [сегодня/день недели]?
  var Q3 = /сколько (?= уроков(?= | в)| предметов(?= | в)| занятий(?= | в))|какое количество(?= уроков(?= | в)| предметов(?= | в)| занятий(?= | в))/.test(txt);
  //4. Есть ли (у меня) [предмет] (в) [сегодня/день недели]?
  var Q4 = /есть ли|есть(?= у меня)|предметы(?= сегодня|)|занятия(?= сегодня)/.test(txt);
  //5. Во сколько (начинаются/заканчиваются) (у меня) [предмет] (в) [сегодня/день недели]?
  var Q51 = /во сколько|когда начинается (?= у меня)|(?= урок|предмет|занятие)/.test(txt);
  var Q52 = /во сколько|когда заканчиваются (?= у меня)|(?= урок|предмет|занятие)/.test(txt);
  var Answer = "";

  if (Q1) {
    if (week) {
      var Answer = "Расписание на неделю...\n";
      for ( var i = 0; i < Days.length; i++ ) {
        Answer = Answer + getScheduleDay(Days[i]) + "\n";
      }
    } else {
      Days = [];
      /* || - логическое "или" (логическое сложение), && - логическое "и" (логическое умножение)
      false||false = false
      true ||false = true
      false||true  = true
      true ||true  = true
      false&&false = false
      true &&false = false
      false&&true  = false
      true &&true  = true /
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
  } else if (Q21) {
    ; // Алиса, добавь программу для Q21
  } else if (Q22) {
    ; // Алиса, добавь программу для Q22
  } else if (Q3) {
    ; // Алиса, добавь программу для Q3
  } else {
    // Ответ бота, если день недели не был указан в сообщении
    ctx.reply( 'Не понял вас, мастер Люк' ); //Скайвокер
  }
*/

});

app.startPolling();
