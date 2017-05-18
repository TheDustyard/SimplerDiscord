module.exports = {
    CommandHandler: {
        prefix: "",
        groups: [],
        commands: [[]],

        AddCommand: function (command, group) {
            this.commands[group].push(command);
            console.log(this.commands);
        },

        Handle: function (message) {
            if (message.content[0] !== this.prefix)
                return;

            console.log(`${message.user} Executed ${message.content}`);
        }
    }
}

var Command = {
    name: "",
    aliases: [],
    args: [],
    description: "",
    method: (message, args) => { return; }
};