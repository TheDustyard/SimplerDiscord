const RateLimiter = require("../Util/RateLimiter");

class Command {
    constructor(name, args, description, method, ratelimit) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.method = method;
        this.ratelimit = new RateLimiter(ratelimit);
    }

    toString() {
        return `{\n  Name: ${this.name}\n  Args: ${this.args}\n  Description: ${this.description}\n  Method: ${this.method}\n}`;
    }
}

module.exports = Command;