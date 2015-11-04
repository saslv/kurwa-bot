var TelegramBot = require('node-telegram-bot-api');

var config = require('./config');

var bot = new TelegramBot(config.token, {polling: true});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bot.sqlite');

/*
db.serialize(function() {
    db.run("CREATE TABLE swear (id PK, part1 VARCHAR(255), part2 VARCHAR(255), part3 VARCHAR(255))");

    var stmt = db.prepare("INSERT INTO swear VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});
*/

//db.close();

bot.onText(/\/shnur/, function (msg) {
  var chatId = msg.chat.id;
  var photo = 'images/shnur.jpg';
  bot.sendPhoto(chatId, photo, {caption: 'Шнур'});
});

bot.onText(/\/hikurwa/, function (msg) {
    bot.sendMessage(msg.chat.id, 'JA PIERDOLE');
});

bot.onText(/курва/, function (msg) {
    bot.sendMessage(msg.chat.id, 'JA PIERDOLE');
});

bot.onText(/300/, function (msg) {
    bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', відсоси у тракториста!');
});

bot.onText(/триста/, function (msg) {
    bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', відсоси у тракториста!');
});

bot.onText(/\/swear/, function (msg) {
    //todo add swear generator
    bot.sendMessage(msg.chat.id, 'JA PIERDOLE');
});

if(config.isDebug){
    bot.on('message', function(msg){
        console.log(msg.text, msg.chat.title, msg.from.username);
    });
}

