const Discord = require("discord.js");
const settings = require('./setting.json');
const BetterCommands = require("./BetterCommands");

const client = new Discord.Client();

var CommandHandler = BetterCommands.Handler.CommandHandler;

CommandHandler.prefix = "!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    CommandHandler.Handle(msg);
});

client.login(settings.token);