const Discord = require("discord.js");
const Command = require("../Types/Command");
const StringUtils = require("../Util/StringUtils");

class MessageHandler {
    constructor(ratelimit) {
        this.messages = [];
        this.ratelimit = ratelimit;
        
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

        if (message.ratelimit.delay !== undefined) {
            if (RateLimited(command.ratelimit, msg)) return;
        } else if (this.ratelimit.delay !== undefined) {
            if (RateLimited(this.ratelimit, msg)) return;
        }

        var method = message.method;

        method(msg);
        console.log(`[SimpleDiscord] ${msg.author.username} sent ${msg.content}, which called the linked function`);
    }

    register(message, method, distance, ratelimit) {
        if (distance === null || distance === undefined)
            distance = 0;
        if (distance === true)
            distance = message.length / 2;


        if (method === null || method === undefined)
            throw `No method given for message handler ${message}`;

        this.messages.push({
            method: method,
            message: message.toLowerCase().trim(),
            distance: distance,
            ratelimit: ratelimit
        });
    }
}

function RateLimited(ratelimit, msg) {
    if (ratelimit.limited(msg.author.username)) {
        console.log(`[SimpleDiscord] ${msg.author.username} is being rate limited`);
        msg.channel.send(`Slow Down!!`)
            .then(x => DeleteQueue.add(x, 2000));
        return true;
    }
    return false;
}

module.exports = MessageHandler;