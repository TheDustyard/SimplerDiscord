const Discord = require("discord.js");
const Command = require("../Types/Command");

class MessageHandler {
    constructor() {
        this.commands = [];
        //this.commandsAsList = new Command("replies", null, "Get all the messages the bot will reply to", (message, args, handler) => {
        //    message.channel.send("Messages that the bot will reply to:");
        //    message.channel.send(Object.keys(this.commands).join("\n"), {code: true});
        //});
    }

    handle(msg) {
        if (msg.author.bot)
            return;

        var method = this.commands[msg.content.toLowerCase()];

        if (!method)
            return;

        method(msg);
        console.log(`[SimpleDiscord] ${msg.author.username} sent ${msg.content}, which was replied to by the bot`);
    }

    AddMessage(message, method) {
        this.commands[message] = method;
    }
}

module.exports = MessageHandler;