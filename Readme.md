# Telegram Bot App

## Общая информация
Telegram Bot API App is built using MEAN stack (mainly Node)
* MongoDB
* Express
* Angular
* Node

## Структура папок проекта git
* `conf` настройки web сервера
* `htdocs` папка приложения
* `wiki` база знаний (примеры, старые версии приложения)

## Структура локальных папок
### Chat Bots (основные файлы)
* Bot - проект приложения Telegram Bot App
* Docs - документы для научной работы (и примеры др. научных работ)
* PuTTY - терминальный клиент для доступа к серверу с ботом
* Sketches - фото эскизов с доски (которые рисовали вместе)
### Полезные файлы
* программа.txt
* словарь.txt
* ссылки.txt
### Запуск терминального клиента
* `PuTTY\PUTTY.EXE`

## Команды в консоли PuTTY на сервере 1
* `cd apps/Bot` перейти в папку Telegram Bot App
* `sudo git pull origin master` получить последние обновления с git
* `npm install` to resolve dependencies
* `node htdocs/app.js` ручной запуск приложения на сервере
* `CTRL+C` ручной останов приложения на сервере (только для приложения, запущенного вручную)
* `node /opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever start htdocs/app.js` запуск приложения на постоянной основе
* `node /opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever stop htdocs/app.js` останов приложения, запущенного на постоянной основе
