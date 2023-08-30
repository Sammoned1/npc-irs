# НПЦ-ИРС ТЕСТОВОЕ ЗАДАНИЕ

Проект "npc-irs" был создан в качестве тестового задания 
для компании [**НПЦ-ИРС**](http://npcirs.ru/). 
Он содержит серверную и клиентскую часть. Для клиентской части был заимствован 
шаблон с сайта [**Creative Tim**](https://www.creative-tim.com/) и изменён согласно заданию.  
Серверная часть была написана с нуля на платформе **NODE.js**.  
База данных согласно заданию - **PostgreSQL**.

## Клиентская часть

Т.к для клиентской части был заимствован шаблон готового сайта, 
код, который был написан мною самостоятельно находится внутри папки src/myCode.
Помимо этого некоторые файлы шаблона также были изменены.  
Реализация задания находится на странице Tables. На странице представлены три
таблицы.  
Главная таблица : **Users**  
Связанная таблица: **Recent tasks**  
Третья таблица **Unassigned tasks** отображает task, у которого нет назначенного user и была 
добавлена для полноты картины.  
В двух основных таблицах реализован "infinite loading"

## Серверная часть

В серверной части используется express и sequelize. Согласно заданию, некоторые
запросы к бд были написаны на языке **SQL** (sequelize.query()).  
Для методов подгрузки данных из таблиц используются операторы limit и offset.

## База данных

База данных, согласно заданию - **PostgreSQL**. Инициализация и заполнение
находятся в файле init-db.sql в корневой папке проекта. Также для манипулации над
созданными таблицами были добавлены триггеры и триггер-функции.

## Установка зависимостей и запуск проекта

### Установка зависимостей:

Клонирование по http:

```shell
git clone https://github.com/Sammoned1/npc-irs.git
```

Клонирование по ssh:

```shell
git clone git@github.com:Sammoned1/npc-irs.git
```

```shell
cd npc-irs/server
npm i
cd ..
cd client/npc-irs
npm i
```

### Запуск проекта:

База данных:  

```shell
psql -f init-db.sql -U <username>
```

Сервер:

```shell
cd server
nodemon index.js
```

Клиент:

```shell
cd client/npc-irs
npm start
```

## Конфигурация

Для конфигурации проекта необходимо создать .env файл в директориях 
server и client/npc-irs по примеру файлов .env-example в соответствующих директориях.  
В файле server/.env в полях:  

> DB_PASSWORD  
>
> DB_USER  
  
Необходимо ввести данные пользователя **PostgreSQL**