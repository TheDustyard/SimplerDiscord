module.exports = {
    //TYPES
    Command: require("./Types/Command"),

    //HANDLERS
    CommandHandler: require("./Handlers/CommandHandler"),
    MessageHandler: require("./Handlers/MessageHandler"),
    LoggerCommandHandler: require("./Handlers/LoggerCommandHandler"),

    //UTIL
    RandomMessage: require("./Util/RandomMessage"),
    RateLimiter: require("./Util/RateLimiter"),
    DeleteQueue: require("./Util/DeleteQueue"),
    StringUtils: require("./Util/StringUtils"),
    BetterLogger: require("./Util/BetterLogger"),

    //METHODS
    /**
     * Gets an emoji
     * @returns {string} emoji
     * @param {string} name Name of the emoji
     * @param {Guild} guild Guild for the emoji
     */
    getEmoji: function (name, guild) {
        let emoji = guild.emojis.find('name', name);
        if (emoji === undefined)
            return name;
        return `<:${name}:${emoji.id}>`;
    },
    /**
     * Gets a mention of a user
     * @returns {string} Mention
     * @param {string} name Name
     * @param {Guild} guild guild
     */
    getUserMention: function (name, guild) {
        return guild.members.filter((item) => item.user.username.toLowerCase() === this.name.toLowerCase()).join();
    },
    /**
     * Gets a mention of a channel
     * @returns {string} Mention
     * @param {string} name Name
     * @param {Guild} guild Guild
     */
    getChannelMention: function (name, guild) {
        return guild.channels.filter((item) => item.type === "text").filter((item) => item.name === this.name).join();
    }
};