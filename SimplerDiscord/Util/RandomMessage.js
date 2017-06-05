class RandomMessage {
    constructor(messages) {
        this.messages = messages;
        this.choose = function () {
            return this.messages[Math.floor(Math.random() * this.messages.length)];
        };
    }
}

module.exports = RandomMessage;