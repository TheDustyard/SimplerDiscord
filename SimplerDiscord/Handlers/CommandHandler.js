const SimplerDiscord = require("../index");

const Discord = require("discord.js");

class CommandHandler {
    constructor(prefix, options, ratelimit) {
        this.prefix = prefix;
        this.commands = [];
        this.ratelimit = new SimplerDiscord.RateLimit(ratelimit);
        if (options === undefined || options === null)
            options = {};
        this.options = options;
        
        this.regester(new SimplerDiscord.Command("help", null, "Get All Commands", HelpCommand), "Help Commands");
        this.regester(new SimplerDiscord.Command("help", ["command"], "Get Command Info", HelpSearchCommand), "Help Commands");
    }

    regester(command, group) {
        if (group === undefined)
            group = "Other Commands";

        if (this.commands[group] === undefined)
            this.commands[group] = [];

        this.commands[group].push(command);
    }

    handle(message) {
        if (message.content[0] !== this.prefix)
            return;

        if (message.author.bot)
            return;

        var args = message.content.toLowerCase().trim().split(" ");
        var commandname = args[0].substring(this.prefix.length).toLowerCase();
        args.shift();

        var results = this.findCommand(commandname);

        var filtered = results.filter(function (item) {
            if (item.args === null) {
                return args.length === 0;
            //} else if (typeof item.args === "boolean"){
            //    return true;
            } else {
                return item.args.length === args.length;
            }
        });

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
            //if (filtered.some(x => typeof x.args !== "boolean")) {
            //    var morefiltered = filtered.filter(x => typeof x.args === "boolean");
            //    console.log(morefiltered);
            //    if (morefiltered.length === 1) {
            //        let deleteit = morefiltered[0].method(message, args.join(" "), this);
            //        if (deleteit) message.delete();
            //        console.warn(`[SimpleDiscord] ${message.author.username} Called ${message.content}`);
            //        return;
            //    } else if (morefiltered.length > 1) {
            //        console.log(`[SimpleDiscord] !!TWO COMMANDS ARE INTERFERING WITH EACHOTHER!!\n${filtered.map((item) => item.name)}`);
            //        message.channel.send(`Internal Error`);
            //        return;
            //    }
            //}

            if (filtered.length > 1) {
                console.log(`[SimpleDiscord] !!TWO COMMANDS ARE INTERFERING WITH EACHOTHER!!\n${filtered.map((item) => item.name)}`);
                message.channel.send(`Internal Error`);
                return;
            }

            if (filtered.length === 1) {
                this.runCommand(message, filtered[0], args);
                return;
            }
        }

        if (this.options.notfound)
            message.channel.send(`Command ***${commandname}*** not found. Type ***${this.prefix}help*** for all commands`)
                .then(x => DeleteQueue.add(x.id, 1000));

    }

    runCommand(msg, command, args) {
        if (command.ratelimit.delay !== undefined) {
            if (command.ratelimit.limited(msg.author.username)) {
                console.log(`[SimpleDiscord] ${msg.author.username} is being rate limited`);
                return;
            }
        } else if (this.ratelimit.delay !== undefined) {
            if (this.ratelimit.limited(msg.author.username)) {
                console.log(`[SimpleDiscord] ${msg.author.username} is being rate limited`);
                return;
            }
        }

        let deleteit = command.method(msg, args, this);
        if (deleteit) msg.delete();
        console.warn(`[SimpleDiscord] ${msg.author.username} Called ${msg.content}`);
        return;
    }

    findCommand(name) {
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
    if (handler.options.color === undefined)
        helpembed.color = 5446319;
    else
        helpembed.color = handler.options.color;

    for (var group in handler.commands) {
        var outp = "";
        var commands = handler.commands[group];
        for (var command in commands) {
            command = commands[command];
            if (command.args === null) command.args = [];

            var cmdargs;

            //if (typeof command.args === "boolean") {
            //    cmdargs = ["[text]"];
            //} else {
                cmdargs = command.args.map((item) => `[${item}] `);
            //}

            outp += `${handler.prefix}${command.name} ${cmdargs.join("")}- *${command.description}*\n`;
        }
        helpembed.addField(group, outp, false);
    }

    message.channel.send("", {
        embed: helpembed
    });
}

function HelpSearchCommand(message, args, handler) {
    var commands = handler.FindCommand(args[0]);

    var helpembed = new Discord.RichEmbed();
    helpembed.setColor(5446319);
    helpembed.setTitle(`Results for ${args}`);

    for (var command in commands) {
        command = commands[command];
        if (command.args === null) command.args = [];

        var outp = `*Arguments*: ${command.args.join(", ")}` +
                   `\n*Description*: ${command.description}`;

        helpembed.addField(handler.prefix + command.name, outp, false);
    }

    message.channel.send("", {
        embed: helpembed
    });
}

module.exports = CommandHandler;
