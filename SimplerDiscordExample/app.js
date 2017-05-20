const Discord = require("discord.js");
const settings = require('./setting.json');
const SimplerDiscord = require("./SimplerDiscord");

const client = new Discord.Client();

var Commands = new SimplerDiscord.CommandHandler("!");

Commands.AddCommand(new SimplerDiscord.Command("commandone", null, "a command", (message, args) => message.channel.send("COMMAND 1")), "caragory 1");
Commands.AddCommand(new SimplerDiscord.Command("command2", ["an arg"], "a command with args", (message, args) => message.channel.send("COMMAND 2 WITH ONE ARG, " + args)), "catagory 2");
Commands.AddCommand(new SimplerDiscord.Command("command2", ["one", "two"], "a command with the same name, but diferent args", (message, args) => message.channel.send("COMMAND 2 WITH 2 ARGS, " + args)), "catagory 3");

Commands.AddCommand(new SimplerDiscord.Command("mention", ["name", "type"], "mention the given thing", MentionCommmand, "Util Commands"));
Commands.AddCommand(new SimplerDiscord.Command("emoji", ["name"], "get an emoji", EmojiCommand, "Util Commands"));

function EmojiCommand(message, args) {
    message.channel.send(new SimplerDiscord.Emoji(message.guild, args[0]).toString());
}

function MentionCommmand(message, args) {
    message.channel.send(new SimplerDiscord.Mention(message.guild, args[0], args[1]).toString());
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    Commands.Handle(msg);
});

client.login(settings.token);