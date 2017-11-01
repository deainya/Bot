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
                   case "saturday":   var s = "суббота:\nНе кормят...";

                                     return s;
                   case "sunday":    return "воскресенье:\nНе кормят...";
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

app.startPolling();
