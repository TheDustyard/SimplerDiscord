const Command = require("../Types/Command");
const RateLimiter = require("../Util/RateLimiter");
const Queue = require("../Util/DeleteQueue");
const DeleteQueue = new Queue();

const Discord = require("discord.js");

var afks = [];

    /**
     * Can be a Hex Literal, Hex String, Number, RGB Array, or one of the following
     * ```
     * [
     *   'DEFAULT',
     *   'AQUA',
     *   'GREEN',
     *   'BLUE',
     *   'PURPLE',
     *   'GOLD',
     *   'ORANGE',
     *   'RED',
     *   'GREY',
     *   'DARKER_GREY',
     *   'NAVY',
     *   'DARK_AQUA',
     *   'DARK_GREEN',
     *   'DARK_BLUE',
     *   'DARK_PURPLE',
     *   'DARK_GOLD',
     *   'DARK_ORANGE',
     *   'DARK_RED',
     *   'DARK_GREY',
     *   'LIGHT_GREY',
     *   'DARK_NAVY',
     *   'RANDOM',
     * ]
     * ```
     * or something like
     * ```
     * [255, 0, 255]
     * ```
     * for purple
     * @typedef {string|number|Array} ColorResolvable
     */

    /**
     * @typedef HandlerOptions
     * @property {ColorResolvable} color Color of help embeds
     * @property {boolean} notfound Send a message when a command is not found
     */

class CommandHandler {
    /**
     * Create a command handler
     * @param {string} prefix prefix to use
     * @param {HandlerOptions} [options] Options for the handler
     * @param {number} [ratelimit] Default ratelimit
     */
    constructor(prefix, options, ratelimit) {
        this.prefix = prefix;
        this.commands = [];
        this.ratelimit = new RateLimiter(ratelimit);
        if (options === undefined || options === null)
            options = {};
        this.options = options;
        this.vars = {};
        
        this.register(new Command("help", null, "Get All Commands", HelpCommand), "Help Commands");
        this.register(new Command("help", ["command"], "Get Command Info", HelpSearchCommand), "Help Commands");
        this.register(new Command("afk", true, "Go AFK", AFK, 10000), "Utility Commands");
    }

    /**
     * Regieter a command with the command handler
     * @param {Command} command Command to regester
     * @param {string} group Name of the group the command is in
     */
    register(command, group) {
        if (group === undefined)
            group = "Other Commands";

        if (this.commands[group] === undefined)
            this.commands[group] = [];

        this.commands[group].push(command);
    }

    /**
     * Handle the commands for the given message
     * @param {Discord.Message} message Message to handle
     */
    handle(message) {
        UnAFK(message, this);

        if (!message.content.startsWith(this.prefix))
            return;

        if (message.author.bot)
            return;

        let args = message.content.toLowerCase().trim().split(" ");
        let commandname = args[0].substring(this.prefix.length).toLowerCase();
        args.shift();

        let results = this.findCommand(commandname);

        let filtered = results.filter(function (item) {
            if (item.args === null) {
                return args.length === 0;
            } else if (typeof item.args === "boolean"){
                return true;
            } else {
                return item.args.length === args.length;
            }
        });

        if (filtered.length === 0 && results.length > 0) {
            let argumentz = results.map(function (item) {
                if (item.args === null)
                    return 0;
                return item.args.length;
            });
            let argz = "";
            if (argumentz !== null) {
                argz = argumentz.join(', or ');
            }
            message.channel.send(`Command ***${commandname}*** requires ${argz} argument(s), you gave ${args.length} argument(s).`);
            return;
        }

        if (filtered.length > 0) {
            if (filtered.some(x => typeof x.args === "boolean")) {
                let morefiltered = filtered.filter(x => typeof x.args === "boolean");
                if (morefiltered.length === 1) {
                    this.runCommand(message, morefiltered[0], args.join(" "));
                    return;
                } else if (morefiltered.length > 1) {
                    twoCommandsInterfiere(morefiltered, message);
                    return;
                }
            }

            if (filtered.length > 1) {
                twoCommandsInterfiere(filtered, message);
                return;
            }

            if (filtered.length === 1) {
                this.runCommand(message, filtered[0], args);
                return;
            }
        }

        if (this.options.notfound)
            message.channel.send(`Command ***${commandname}*** not found. Type ***${this.prefix}help*** for all commands`)
                .then(x => DeleteQueue.add(x, 10000));

    }

    /**
     * Tell the console that two commands interfiere
     * @private
     * @param {Command[]} filtered Filtered commands
     * @param {Discord.Message} message Message that called the commands
     */
    twoCommandsInterfiere(filtered, message) {
        console.log(`[SimpleDiscord] !!TWO COMMANDS ARE INTERFERING WITH EACHOTHER!!\n${filtered.map((item) => item.name)}`);
        message.channel.send(`Internal Error`);
    }

    /**
     * Run a command
     * @private
     * @param {Discord.Message} msg Message that called the command
     * @param {Command} command Command to run
     * @param {string[]} args Command args
     */
    runCommand(msg, command, args) {
        if (command.ratelimit.delay !== undefined) {
            if (RateLimited(command.ratelimit, msg)) return;
        } else if (this.ratelimit.delay !== undefined) {
            if (RateLimited(this.ratelimit, msg)) return;
        }

        let deleteit = command.method(msg, args, this);
        if (deleteit) msg.delete();
        console.log(`[SimpleDiscord] ${msg.author.username} Called ${msg.content}`);
        return;
    }

    /**
     * Find a command
     * @param {string} name Command name
     * @returns {Command} Command
     */
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

function RateLimited(ratelimit, msg) {
    if (ratelimit.limited(msg.author.username)) {
        console.log(`[SimpleDiscord] ${msg.author.username} is being rate limited`);
        msg.channel.send(`Slow Down!!`)
            .then(x => DeleteQueue.add(x, 2000));
        return true;
    }
    return false;
}

function CreateEmbed(handler, message) {
    var helpembed = new Discord.RichEmbed();
    if (handler.options.color === undefined)
        helpembed.color = message.guild.me.colorRole.color;
    else
        helpembed.color = handler.options.color;

    return helpembed;
}

function HelpCommand(message, args, handler) {
    var helpembed = CreateEmbed(handler, message);

    for (var group in handler.commands) {
        var outp = "";
        var commands = handler.commands[group];
        for (var command in commands) {
            command = commands[command];
            if (command.args === null) command.args = [];

            var cmdargs;

            if (typeof command.args === "boolean") {
                cmdargs = ["[text]"];
            } else {
                cmdargs = command.args.map((item) => `[${item}] `);
            }

            outp += `${handler.prefix}${command.name} ${cmdargs.join("")}- *${command.description}*\n`;
        }
        helpembed.addField(group, outp, false);
    }

    message.channel.send("", {
        embed: helpembed
    });
}

function HelpSearchCommand(message, args, handler) {
    var commands = handler.findCommand(args[0]);

    var helpembed = CreateEmbed(handler, message);
    
    helpembed.setTitle(`Results for ${args}`);

    if (commands.length > 0) {
        for (var command in commands) {
            command = commands[command];
            if (command.args === null) command.args = [];
            if (typeof command.args === "boolean") {
                command.args = ["[text]"];
            }

            var outp = `*Arguments*: ${command.args.join(", ")}` +
                `\n*Description*: ${command.description}`;

            helpembed.addField(handler.prefix + command.name, outp, false);
        }
    } else {
        helpembed.setDescription("No results");
    }


    message.channel.send("", {
        embed: helpembed
    });
}

function AFK(message, args, handler) {
    if (args === "")
        args = "AFK";

    afks[message.author.username] = args;

    message.channel.send(`${message.author}, I set your AFK: ${args}`);

    return true;
}

function UnAFK(message, handler) {
    checkMention(message, afks);

    if (afks[message.author.username] === undefined || afks[message.author.username] === null)
        return;

    delete afks[message.author.username];

    message.channel.send(`Welcome back ${message.author}`)
        .then(x => DeleteQueue.add(x, 10000));
}

function checkMention(msg, afks) {
    if (msg.author.bot) return;
    if (!msg.mentions.members) return;
    var mentions = msg.mentions.members.array();
    for (person in afks) {
        if (mentions.some(x => x.user.username === person))
            msg.channel.send(`**${person}** is *AFK*: ${afks[person]}`)
                .then(x => DeleteQueue.add(x, 10000));
    }
}

module.exports = CommandHandler;
