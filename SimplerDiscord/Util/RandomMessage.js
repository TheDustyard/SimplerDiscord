class RandomMessage {
    constructor(messages) {
        this.messages = messages;
        this.chooose = function () {
            return this.messages[Math.floor(Math.random() * this.messages.length)];
        };
    }
}

module.exports = RandomMessage;