# НПЦ-ИРС ТЕСТОВОЕ ЗАДАНИЕ

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

## Конфигурация

Для конфигурации проекта необходимо создать .env файл в директориях 
server и client/npc-irs по примеру файлов .env-example в соответствующих директориях.  
В файле server/.env в полях:  

> DB_PASSWORD  
>
> DB_USER  
  
Необходимо ввести данные пользователя **PostgreSQL**