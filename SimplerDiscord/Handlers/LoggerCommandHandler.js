class LoggerCommandHandler {

    constructor(client) {
        this.client = client;
        this.commands = [];
        this.vars = {};

        this.regester("help", "Get all commands avaliable to you", (args, handler) => {
            console.log(handler.commands.map(x => `${x.name} - ${x.description}`.bold).join("\n"));
        });
        this.regester("channel", "Connect to a channel", (args, handler) => {
            handler.vars.channel = handler.client.channels.get(args[0]);
            if (handler.vars.channel === null || handler.vars.channel === undefined) {
                console.log(`CANNOT FIND CHANNEL ${args[0]}`);
                return;
            }
            console.log(`SWITCHED CHANNEL TO ${handler.vars.channel.name}`);
        });
        this.regester("say", "Send message to connected channel", (args, handler) => {
            if (handler.vars.channel === undefined) {
                console.error("NO CHANNEL SELECTED");
                return;
            }
            handler.vars.channel.send(args.join(" "));
        });
    }

    regester(name, description, method) {
        this.commands.push({ name: name, description: description, method: method });
    }

    //  TODO: MAKE BETTER
    handle(tohandle) {
        var command = tohandle.split(" ")[0];
        var args = tohandle.split(" ");
        args.shift();

        var commandtorun = this.commands.find((val, index, obj) => val.name === command);

        if (commandtorun !== undefined) {
            commandtorun.method(args, this);
            return;
        }

        console.log(`${command} is not recognized as an internal or external command`);
    }

    completer(line) {
        var completions = ["help", "command1", "command2", "login", "check", "ping"];
        var hits = completions.filter(function(c) {
            return c.indexOf(line) === 0;
        });

        if (hits.length === 1) {
            return [hits, line];
        } else {
            console.log("Suggest :");
            var list = "",
                l = 0,
                c = "",
                t = hits.length ? hits : completions;
            for (var i = 0; i < t.length; i++) {
                c = t[i].replace(/(\s*)$/g, "");
                if (list !== "") {
                    list += ", ";
                }
                if ((list + c).length + 4 - l > process.stdout.columns) {
                    list += "\n";
                    l = list.length;
                }
                list += c;
            }
            console.log(list + "\n");
            return [hits, line];
        }
    }
}

module.exports = LoggerCommandHandler;