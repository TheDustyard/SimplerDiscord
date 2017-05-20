const Command = require("./Command");
const Discord = require("discord.js");

class CommandHandler {
    constructor(prefix) {
        this.prefix = prefix;
        this.commands = [];
        
        this.AddCommand(new Command("help", null, "Get All Commands", HelpCommand), "Help Commands");
        this.AddCommand(new Command("help", ["command"], "Get Command Info", HelpSearchCommand), "Help Commands");
    }

    AddCommand(command, group) {
        if (group === undefined)
            group = "Other Commands";

        if (this.commands[group] === undefined)
            this.commands[group] = [];

        this.commands[group].push(command);

        //console.log(command);
    }

    Handle(message) {
        if (message.content[0] !== this.prefix)
            return;

        //console.warn(`${message.author.username} Called ${message.content}`);
        //console.log(this.commands);

        var args = message.content.toLowerCase().trim().split(" ");
        var commandname = args[0].substring(1);
        args.shift();

        var results = this.FindCommand(commandname);

        //console.log(results);

        var filtered = results.filter(function (item) {
            if (item.args === null) {
                return args.length === 0;
            } else {
                return item.args.length === args.length;
            }
        });

        //console.log(filtered);

        if (filtered.length === 0 && results.length > 0) {
            var argumentz = results.map(function (item) {
                if (item.args === null)
                    return 0;
                return item.args.length;
            });
            var argz = "";
            if (argumentz !== null) {
                argz = argumentz.join(', or ');
            }
            message.channel.send(`Command ***${commandname}*** requires ${argz} argument(s), you gave ${args.length} argument(s).`);
            return;
        }

        if (filtered.length > 0) {
            if (filtered.length > 1) {
                console.log(`!!TWO COMMANDS ARE INTERFERING WITH EACHOTHER!!\n${filtered.map((item) => item.name)}`);
                message.channel.send(`Internal Error`);
                return;
            }

            if (filtered.length === 1) {
                filtered[0].method(message, args, this);
                console.warn(`${message.author.username} Called ${message.content}`);
                return;
            }
        }

        message.channel.send(`Command ***${commandname}*** not found. Type ***${this.prefix}help*** for all commands`);

    }

    FindCommand(name) {
        var out = [];

        for (var index in this.commands) {
            for (var index1 in this.commands[index]) {
                var command = this.commands[index][index1];
                if (command.name === name) {
                    out.push(command);
                }
            }
        }

        return out;
    }
}

function HelpCommand(message, args, handler) {
    var helpembed = new Discord.RichEmbed();
    helpembed.color = 5446319;

    for (var group in handler.commands) {
        var outp = "";
        var commands = handler.commands[group];
        for (var command in commands) {
            command = commands[command];
            if (command.args === null) command.args = [];

            command.args = command.args.map((item) => `[${item}] `);

            outp += `${handler.prefix}${command.name} ${command.args.join("")}- *${command.description}*\n`;
        }
        helpembed.addField(group, outp, false);
    }

    message.channel.send("", {
        embed: helpembed
    });
}

function HelpSearchCommand(message, args, handler) {
    message.channel.send(handler.FindCommand(args[0]));
}

module.exports = CommandHandler;
