const Discord = require("discord.js");
const Command = require("./Command");

class MessageHandler {
    constructor() {
        this.commands = [];
        this.listCommand = new Command("replies", null, "Get all the messages the bot will reply to", (message, args, handler) => {
            var embed = new Discord.RichEmbed();
            embed.setTitle("Messages that the bot will reply to");
            embed.setDescription(Object.keys(this.commands).join("\n"));
            message.channel.send("", { embed: embed });
        });
    }

    Handle(msg) {
        if (msg.author.bot)
            return;

        var method = this.commands[msg.content];

        if (!method)
            return;

        method(msg);
    }

    AddMessage(message, method) {
        this.commands[message] = method;
    }
}

module.exports = MessageHandler;