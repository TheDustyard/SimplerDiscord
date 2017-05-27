const Discord = require("discord.js");
const settings = require('./setting.json');
//const SimplerDiscord = require("Simpler-Discord");
const SimplerDiscord = require("../SimplerDiscord/index");

const client = new Discord.Client();

var Commands = new SimplerDiscord.CommandHandler("!", { color: undefined, notfound: true }, 5000);
var Messages = new SimplerDiscord.MessageHandler();

var PingCommand = new SimplerDiscord.Command("ping", null, "Ping the bot", Ping);
var CombineCommand = new SimplerDiscord.Command("combine", ["first", "second"], "Combine the two strings", Combine);

Commands.regester(PingCommand, "Utility Commands");
Commands.regester(CombineCommand, "Utility Commands");

Messages.add("poop", function (msg) { msg.channel.send("POOP!"); });

function Ping(message, args, handler) {
    var responses = new SimplerDiscord.RandomMessage(["POOP", "POP", "NOP", "DAB", SimplerDiscord.getEmoji("god", message.guild)]);
    message.channel.send(responses.chooose());
    return true;
}

function Combine(message, args, handler) {
    message.channel.send(args[0] + args[1]);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    Commands.handle(msg);
    Messages.handle(msg);
});

client.login(settings.token);