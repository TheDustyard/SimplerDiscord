class Command {
    constructor(name, args, description, method) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.method = method;
    }
}

module.exports = Command;