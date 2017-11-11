var TelegramBot = require('telegraf');
var Config      = require('./config');

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

var tdotw = function(day_of_the_week) {
                 var days = {"monday":"понедельник", "tuesday":"вторник", "wednesday":"среда", "thursday":"четверг", "friday":"пятница", "saturday":"суббота", "sunday":"воскресенье"};
                 return days[day_of_the_week];
               }

               var getMenuDay = function(day_of_the_week) {
                 switch(day_of_the_week){
                   case "monday":    var s = "понедельник:\n";
                                     for ( var i = 0; i < menu.monday.length; i++ ) {
                                       s = s + menu[day_of_the_week][i].dish + '\n';
                                     }
                                     return s;
                   case "tuesday":   var s = "вторник:\n ";
                                     for ( var i = 0; i < menu.tuesday.length; i++ ) {
                                       s = s + schedule.tuesday[i].dish +'\n';
                                     }
                                     return s;
                   case "wednesday": var s = "среда:\n";
                                     for ( var i = 0; i < menu.wednesday.length; i++ ) {
                                       s = s + schedule.wednesday[i].dish +'\n';
                                     }
                                     return s;
                   case "thursday":  var s = "четверг:\n";
                                     for ( var i = 0; i < menu.thursday.length; i++ ) {
                                       s = s + menu.thursday[i].dish + '\n';
                                     }
                                     return s;
                   case "friday":    var s = "пятницу:\n";
                                     for ( var i = 0; i < menu.friday.length; i++ ) {
                                       s = s + menu.friday[i].dish +'\n';
                                     }
                                     return s;
                   case "saturday":   var s = "суббота:\nНе кормят...Печалька";

                                     return "";
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
  Days.splice(Days.indexOf("saturday","sunday"),1); // Удаляем элемент с названием Вс.: indexOf - индекс элемента; splice(index, cnt) удалить элементы начиная с индекса index в количестве cnt
  Days.push("saturday","sunday"); // Добавляем элемент в хвост массива


  var Q1 = /меню сегодня|меню(?= на| в)|что(?= в меню сегодня| за меню сегодня)|какое(?= меню(?= в))/.test(txt);
  var Q2 = /есть ли|есть(?= у меня)|меню(?= сегодня|)/.test(txt);
  var Answer = "";

  if (Q1) {
    if (week) {
      var Answer = "Меню на неделю\n";
      for ( var i = 0; i < Days.length; i++ ) {
        Answer = Answer + getMenuDay(Days[i]) + "\n";
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
      true &&true  = true */
      if (mon||day&&Day==="monday"   ) { Days.push("monday");    }
      if (tue||day&&Day==="tuesday"  ) { Days.push("tuesday");   }
      if (wed||day&&Day==="wednesday") { Days.push("wednesday"); }
      if (thu||day&&Day==="thursday" ) { Days.push("thursday");  }
      if (fri||day&&Day==="friday"   ) { Days.push("friday");    }
      if (sat||day&&Day==="saturday" ) { Days.push("saturday");  }
      if (sun||day&&Day==="sunday"   ) { Days.push("sunday");    }
      if (Days.length > 0) {
        var Answer = "Вот меню на ";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getMenuDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getMenuDay(Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, мастер Люк"; }
    }
    ctx.reply( Answer ); // Шлём готовый ответ пользователю
  } else if (Q2) {
    if (week) {
      var Answer = "Меню на неделю имеется\n";
      for ( var i = 0; i < Days.length; i++ ) {
        Answer = Answer + getMenuDay(Days[i]) + "\n";
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
        var Answer = "Вот меню на ";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getMenuDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, мастер Люк"; }
    }
  }  else {
    ctx.reply( 'Не понял вас, мастер Люк' );
  }
});

app.startPolling();
