# NPC-IRS TEST-TASK

Проект "npc-irs" был создан в качестве тестового задания 
для компании [**НПЦ-ИРС**](http://npcirs.ru/). 
Он содержит серверную и клиентскую часть. Для клиентской части был заимствован 
шаблон с сайта [**Creative Tim**](https://www.creative-tim.com/) и изменён согласно заданию.  
Серверная часть была написана с нуля на платформе **NODE.js**.  
База данных согласно заданию - **PostgreSQL**.

## Клиентская часть

## Серверная часть

## База данных

## Установка зависимостей и запуск проекта

### Установка зависимостей:

```shell
$ git clone git@github.com:Sammoned1/npc-irs.git
$ cd npc-irs/server
$ npm i --save package.json
$ cd ..
$ cd client/npc-irs
$ npm i --save package.json
```

### Запуск проекта:
База данных:  

```shell
$ psql -f init-db.sql -U <username>
```

Сервер:
```shell
$ cd server
$ nodemon index.js
```
Клиент:
```shell
$ cd client/npc-irs
$ npm start
```

## Configuration
To configure this API you need to create .env file with this structure
text
JWT_SECRET_KEY = <secret key here>
JWT_REFRESH_SECRET_KEY = <secret key here>
MONGO_CONNECTION_STRING = mongodb://host:port

## Docs
If you run this app without specified host, full openApi docs will be here:
http://127.0.0.1:8000/docs