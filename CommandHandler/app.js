const Discord = require("discord.js");
const settings = require('./setting.json');
const Commands = require("./CommandHandler/CommandHandler.js");

const client = new Discord.Client();

var CommandHandler = new Commands.CommandHandler();

CommandHandler.prefix = "!";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    CommandHandler.Handle(msg);
});

client.login(settings.token);