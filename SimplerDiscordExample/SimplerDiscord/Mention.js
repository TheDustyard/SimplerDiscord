class Mention {
    constructor(guild, name, type) {
        this.guild = guild;
        this.name = name;
        this.type = type;
    }

    toString() {
        var out = "";
        var channels = this.guild.channels.array();
        var users = this.guild.members.array();
        switch (this.type.toLowerCase()) {
            case "user":
                users = users.filter((item) => item.user.username.toLowerCase() === this.name.toLowerCase());
                out = users.join();
                break;
            case "channel":
                channels = channels.filter((item) => item.type === "text");
                channels = channels.filter((item) => item.name === this.name);
                out = channels.join();
                break;
            default:
                return `${this.type} is an invalid mention type`;
        }
        if (out === "") return `${this.name}`;
        return out;
    }
}

module.exports = Mention;