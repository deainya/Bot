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
                 switch(day_of_the_week){
                   case "monday":    var s = "понедельник:\n";           // case- случай, switch- переключать,length-длина, default- по умолчанию
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
  var Days = ["sunday","monday","tuesday","wednesday","thursday","friday"];
  var Day = Days[today.getDay()]; // Сегодняшний день недели (today.getDay() возвращает значение от 0 до 6)
  Days.splice(Days.indexOf("saturday","sunday"),2); // Удаляем элемент с названием Вс.: indexOf - индекс элемента; splice(index, cnt) удалить элементы начиная с индекса index в количестве cnt,  splice- сращивание
  Days.push("saturday","sunday"); // Добавляем элемент в хвост массива

 else {
    ctx.reply( 'Не понял вас, мастер Люк' );
  };

app.startPolling();
