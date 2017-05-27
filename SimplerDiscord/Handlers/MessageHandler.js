const Discord = require("discord.js");
const Command = require("../Types/Command");

class MessageHandler {
    constructor() {
        this.messages = [];
        //this.commandsAsList = new Command("replies", null, "Get all the messages the bot will reply to", (message, args, handler) => {
        //    message.channel.send("Messages that the bot will reply to:");
        //    message.channel.send(Object.keys(this.commands).join("\n"), {code: true});
        //});
    }

    handle(msg) {
        if (msg.author.bot)
            return;

        var message = this.messages.find((val, index, obj) => val.message === msg.content.toLowerCase());

        if (message === null || message === undefined)
            return;

        var method = message.method;

        method(msg);
        console.log(`[SimpleDiscord] ${msg.author.username} sent ${msg.content}, which was replied to by the bot`);
    }

    add(message, method) {
        this.messages.push({
            method: method,
            message: message
        });
    }
}

module.exports = MessageHandler;