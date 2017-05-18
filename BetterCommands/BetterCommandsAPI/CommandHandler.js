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

        console.log(this.commands);
    }

    Handle(message) {
        if (message.content[0] !== this.prefix)
            return;

        console.log(`${message.author.username} Executed ${message.content}`);
    }

    HelpCommand(message, args) {

    }

    HelpSearchCommand(message, args) {

    }
}

module.exports = CommandHandler;