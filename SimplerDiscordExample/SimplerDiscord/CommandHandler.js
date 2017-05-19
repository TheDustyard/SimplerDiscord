const Command = require("./Command");

class CommandHandler {
    constructor(prefix) {
        this.prefix = prefix;
        this.commands = [];
        
        this.AddCommand(new Command("help", null, "Get All Commands", this.HelpCommand), "Help Commands");
        this.AddCommand(new Command("help", ["command"], "Get Command Info", this.HelpSearchCommand), "Help Commands");
    }

    AddCommand(command, group) {
        if (group === undefined)
            group = "Other Commands";

        if (this.commands[group] === undefined)
            this.commands[group] = [];

        this.commands[group].push(command);

        console.log(command);
    }

    Handle(message) {
        if (message.content[0] !== this.prefix)
            return;

        console.warn(`${message.author.username} Called ${message.content}`);

        var args = message.content.toLowerCase().trim().split(" ");
        var commandname = args[0].substring(1);
        args.shift();

        var results = this.FindCommand(commandname);

        console.log(results);

        var filtered = results.filter(function (item) {
            if (item.args === null) {
                return args.length === 0;
            } else {
                return item.args.length === args.length;
            }
        });

        console.log(filtered);

        if (filtered.length === 0 && results.length > 0) {
            var argumentz = results.map(function (item) {
                if (item.args === null)
                    return 0;
                return item.args.length;
            });
            var argz = "";
            if (argumentz !== null) {
                argz += argumentz.join(', or ');
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

    HelpCommand(message, args, handler) {
        message.channel.send("no");
    }

    HelpSearchCommand(message, args, handler) {
        message.channel.send(handler.FindCommand(args[0]));
    }
}

module.exports = CommandHandler;
