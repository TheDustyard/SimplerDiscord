const Discord = require("discord.js");
const Command = require("../Types/Command");
const StringUtils = require("../Util/StringUtils");

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

        var message = this.messages.find((val, index, obj) => StringUtils.getLevenshtein(val.message, msg.content.toLowerCase().trim()) <= val.distance);

        if (message === null || message === undefined)
            return;

        var method = message.method;

        method(msg);
        console.log(`[SimpleDiscord] ${msg.author.username} sent ${msg.content}, which called the linked function`);
    }

    add(message, method, distance) {
        if (distance === null || distance === undefined)
            distance = 0;
        if (distance === true)
            distance = message.length / 2;

        if (method === null || method === undefined)
            throw `No method given for message handler ${message}`;

        this.messages.push({
            method: method,
            message: message.toLowerCase().trim(),
            distance: distance
        });
    }
}

module.exports = MessageHandler;