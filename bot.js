var config = require('./config');
var TelegramBot = require('node-telegram-bot-api');
var shell = require('shelljs');
var bot = new TelegramBot(config.token, {polling: true});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bot.sqlite');

var version = {
    number: shell.exec('git log --pretty=oneline | wc -l', {silent: true}).output.replace(/(\n|\r)+$/, ''),
    message: shell.exec('git log -1 --oneline', {silent: true}).output.replace(/(\n|\r)+$/, '')
}

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

var sick_array = ['хворий виблядок', 'огидна тварина', 'страшна істота', 'стрьомне чмо'];

function random_array_val(items){
	return items[Math.floor(Math.random()*items.length)];
}

bot.onText(/\/shnur/, function (msg) {
    var chatId = msg.chat.id;
    var photo = 'images/shnur.jpg';
    bot.sendPhoto(chatId, photo, {caption: 'Шнур'});
});

bot.onText(/\/hikurwa|курва/, function (msg) {
    bot.sendMessage(msg.chat.id, 'JA PIERDOLE');
});

bot.onText(/\/version/, function (msg) {
    bot.sendMessage(msg.chat.id, 'Версія: ' + version.number + '. \r\nЩо нового: ' + version.message + '.', {parse_mode: 'Markdown'});
});

bot.onText(/300|триста/, function (msg) {
    bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', відсоси у тракториста!');
});

bot.onText(/amputee|porn|гімно|кров|кишки|shit|gay|говно|говне|гей/, function (msg) {
	var message = random_array_val(sick_array);
    bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', ' + message + '!');
});

bot.onText(/\/swear/, function (msg) {
    //todo add swear generator
    bot.sendMessage(msg.chat.id, 'JA PIERDOLE');
});

var simple_math_re = /\s*([-+]?[0-9]*\.?[0-9]+)\s*([\/\+\-\*])(\s*)+([-+]?[0-9]*\.?[0-9]+)\s*/;

bot.onText(simple_math_re, function (msg) {
    var matches = simple_math_re.exec(msg.text);

    if(matches){
        var result = eval(re.exec(msg.text)[0]);
        if(result == 300){
            bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', відсоси у тракториста! (' + matches[0] + ')');
        }else{
            bot.sendMessage(msg.chat.id, '@' + msg.from.username + ', можливо я допоможу тобі обчисливши (' + matches[0] + ') = ' + result);
        }
    }

});

if(config.isDebug){
    bot.on('message', function(msg){
        console.log(msg.text, msg.chat.title, msg.from.username);
    });
}
