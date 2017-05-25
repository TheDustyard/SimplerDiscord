class RandomMessage {
    constructor(messages) {
        this.messages = messages;
    }

    chooose() {
        return this.messages[Math.floor(Math.random() * this.messages.length)];
    }
}

module.exports = RandomMessage;