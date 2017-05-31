module.exports = {
    //TYPES
    Command: require("./Types/Command"),
    Mention: require("./Types/Mention"),

    //HANDLERS
    CommandHandler: require("./Handlers/CommandHandler"),
    MessageHandler: require("./Handlers/MessageHandler"),

    //UTIL
    RandomMessage: require("./Util/RandomMessage"),
    RateLimiter: require("./Util/RateLimiter"),
    DeleteQueue: require("./Util/DeleteQueue"),
    StringUtils: require("./Util/StringUtils"),
    BetterLogger: require("./Util/BetterLogger"),
    LoggerCommandHandler: require("./Handlers/LoggerCommandHandler"),

    //METHODS
    getEmoji: (name, guild) => `<:${name}:${guild.emojis.find('name', name).id}>`
};