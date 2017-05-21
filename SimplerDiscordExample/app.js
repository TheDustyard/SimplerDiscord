const Discord = require("./node_modules/discord.js");
const settings = require('./setting.json');
//const SimplerDiscord = require("Simpler-Discord");
const SimplerDiscord = require("../SimplerDiscord/index");

const client = new Discord.Client();

var Commands = new SimplerDiscord.CommandHandler("!");
var Messages = new SimplerDiscord.MessageHandler();

var PingCommand = new SimplerDiscord.Command("ping", null, "Ping the bot", Ping);
var CombineCommand = new SimplerDiscord.Command("combine", ["first", "second"], "Combine the two strings", Combine);

Commands.AddCommand(PingCommand, "Utility Commands");
Commands.AddCommand(CombineCommand, "Utility Commands");
Commands.AddCommand(Messages.Command, "Help Commands");

Messages.AddMessage("poop", (msg) => msg.channel.send("POOP!"));

function Ping(mesage, args, handler) {
    message.channel.send("pong");
}

function Combine(mesage, args, handler) {
    message.channel.send(args[0] + args[1]);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    Commands.Handle(msg);
    Messages.Handle(msg);
});

client.login(settings.token);