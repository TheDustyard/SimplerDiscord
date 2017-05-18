class Command {
    constructor(name, args, description, method) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.method = method;
    }
}

class CommandHandler {
    constructor(prefix) {
        this.prefix = prefix;
        this.commands = {};

        this.AddCommand("help", null, "Get All Commands", this.HelpCommand);
        this.AddCommand("help", ["command"], "Get Command Info", this.HelpSearchCommand);
    }

    AddCommand(command, group) {
        if (group === undefined)
            group = "Other Commands";

        if (this.commands[group] === undefined)
            this.commands[group] = [];

        this.commands[group].push(command);

        console.log(this.commands);
    }

    Handle (message) {
        if (message.content[0] !== this.prefix)
            return;

        console.log(`${message.user} Executed ${message.content}`);
    }

    HelpCommand(message, args) {

    }

    HelpSearchCommand(message, args) {

    } 
}
///END COMMANDHANDLER


const Discord = require("discord.js");
const settings = require('./setting.json');
const BetterCommands = require("./BetterCommands");

const client = new Discord.Client();

var Commands = new CommandHandler("!");

Commands.AddCommand(new Command("jeffery", null, "meeeeem", (message, args) => console.log(message.content)));
Commands.AddCommand(new Command("bob", ["memme"], "meeeeem", (message, args) => console.log(args)));
Commands.AddCommand(new Command("bob", ["mememem", "meeeeem"], "meeeeem", (message, args) => console.log(args)));


client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    CommandHandler.Handle(msg);
});

client.login(settings.token);