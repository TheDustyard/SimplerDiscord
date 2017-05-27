class RateLimiter {
    constructor(delay) {
        this.delay = delay;
        this.array = [];
    }

    limited(name) {
        var last = this.array[name];
        if (last === undefined) {
            last = new Date();
            this.array[name] = last;
            return false;
        }

        var now = new Date();

        var is = last.valueOf() + this.delay >= now.valueOf();

        if (!is)
            last = now;

        this.array[name] = last;

        return is;
    }
}

module.exports = RateLimiter;