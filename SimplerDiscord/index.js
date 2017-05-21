module.exports = {
    //TYPES
    Command: require("./Types/Command"),
    Mention: require("./Types/Mention"),
    Emoji: require("./Types/Emoji"),

    //HANDLERS
    CommandHandler: require("./Handlers/CommandHandler"),
    MessageHandler: require("./Handlers/MessageHandler"),

    //UTIL
    RandomMessage: require("./Util/RandomMessage"),

    //ADDONS
    Addons: require("./Addons")
};