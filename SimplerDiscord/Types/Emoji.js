class Emoji {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return `:${this.name}:`;
    }
}

module.exports = Emoji;