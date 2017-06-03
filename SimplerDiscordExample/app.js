const Discord = require("discord.js");
const settings = require('./setting.json');
const SimplerDiscord = require("Simpler-Discord");
//const SimplerDiscord = require("../SimplerDiscord/index");

const client = new Discord.Client();

var DeleteQueue = new SimplerDiscord.DeleteQueue();
var Commands = new SimplerDiscord.CommandHandler("d!", { color: undefined, notfound: true }, 5000);
var Messages = new SimplerDiscord.MessageHandler();

var PingCommand = new SimplerDiscord.Command("ping", null, "Ping the bot", Ping);
var EchoCommand = new SimplerDiscord.Command("echo", true, "Echo the string", Echo);

Commands.register(PingCommand, "Utility Commands");
Commands.register(EchoCommand, "Fun Commands");

Messages.register("poop", function (msg) { msg.channel.send("POOP!"); });
Messages.register("did you know you can become a discord partner", function (msg) { msg.channel.send("DIE, PLEASE!"); }, true);
Messages.register("AAAAAAAA", function (msg) { msg.channel.send("AAAAAAAAAAAAAAAAAAAAAAAAAAAA"); }, 2);

function Ping(message, args, handler) {
    var responses = new SimplerDiscord.RandomMessage(["POOP", "POP", "NOP", "DAB", SimplerDiscord.getEmoji("god", message.guild)]);
    message.channel.send(responses.chooose())
        .then(x => DeleteQueue.add(x, 10000));
    return true;
}

function Echo(message, args, handler) {
    message.channel.send(args + " " + SimplerDiscord.getEmoji("god", message.guild));
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);

});

client.on('message', msg => {
    Commands.handle(msg);
    Messages.handle(msg);
});

client.login(settings.token);

var loggerHandler = new SimplerDiscord.LoggerCommandHandler(client);

var logger = new SimplerDiscord.BetterLogger(loggerHandler);

logger.start();

console.log("LOG");
console.info("INFO");
console.warn("WARN");
console.error("ERROR");
