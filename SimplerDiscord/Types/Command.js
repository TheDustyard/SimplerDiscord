const RateLimiter = require("../Util/RateLimiter");
const Discord = require("discord.js");

class Command {
    /**
     * @callback Callback
     * @param {Message} message - Indicates whether the Courage component is present.
     * @param {string[]} args - Indicates whether the Power component is present.
     * @param {CommandHanlder} [handler] - Indicates whether the Wisdom component is present.
     */

    /**
     * Create a command object
     * 
     * @param {string} name Name of the command
     * @param {string[]|boolean} args Arguments the command wants, null for no commands, true for everything given as an arg
     * @param {string} description
     * @param {Callback} method
     * @param {?number} [ratelimit]
     *
     * @type {Command}
     */
    constructor(name, args, description, method, ratelimit) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.method = method;
        this.ratelimit = new RateLimiter(ratelimit);
    }

    /**
     * @returns This as a string
     */
    toString() {
        return `{\n  Name: ${this.name}\n  Args: ${this.args}\n  Description: ${this.description}\n  Method: ${this.method}\n}`;
    }
}

module.exports = Command;