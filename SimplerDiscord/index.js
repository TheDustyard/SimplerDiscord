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
     * @returns {string}
     * @param {string} name
     * @param {Guild} guild
     */
    getEmoji: (name, guild) => `<:${name}:${guild.emojis.find('name', name).id}>`,
    /**
     * Gets a mention of a user
     * @returns {string}
     * @param {string} name
     * @param {Guild} guild
     */
    getUserMention: (name, guild) => users.filter((item) => item.user.username.toLowerCase() === this.name.toLowerCase()).join(),
    /**
     * Gets a mention of a channel
     * @returns {string}
     * @param {string} name
     * @param {Guild} guild
     */
    getChannelMention: (namw, guild) => channels.filter((item) => item.type === "text").filter((item) => item.name === this.name).join()
};