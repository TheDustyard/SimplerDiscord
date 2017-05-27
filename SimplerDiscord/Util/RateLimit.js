class RateLimit {
    constructor(delay) {
        this.delay = delay;
        //this.last = new Date();
        this.array = [];
    }

    limited(name) {
        var last = this.array[name];
        if (last === undefined)
            last = new Date();

        var now = new Date();
        //console.log(this.array);
        //console.log(this.delay);
        //console.log(now.valueOf());
        //console.log(last.valueOf() + this.delay);
        //console.log(last.valueOf() + this.delay >= now.valueOf());

        var is = last.valueOf() + this.delay >= now.valueOf();

        if (!is)
            last = now;

        this.array[name] = last;

        return is;
    }
}

module.exports = RateLimit;