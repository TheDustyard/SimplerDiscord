const Discord = require("discord.js");
const settings = require('./setting.json');
const BetterCommands = require("./BetterCommandsAPI");

const client = new Discord.Client();

var Commands = new BetterCommands.CommandHandler("!");

Commands.AddCommand(new BetterCommands.Command("jeffery", null, "meeeeem", (message, args) => console.log(message.content)));
Commands.AddCommand(new BetterCommands.Command("bob", ["memme"], "meeeeem", (message, args) => console.log(args)));
Commands.AddCommand(new BetterCommands.Command("bob", ["mememem", "meeeeem"], "meeeeem", (message, args) => console.log(args)));


client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    Commands.Handle(msg);
});

client.login(settings.token);