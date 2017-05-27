class DeleteQueue {

    constructor() {
        this.list = [];
        this.start();
    }

    add(id, delay) {
        this.list[id] = new Date().valueOf() + delay;
        console.log(id);
    }

    tick() {
        console.log(this.list);
    }

    start() {
        this.interval = setInterval(this.tick, 1000);
    }

    stop() {
        this.interval.stop();
    }

}

module.exports = DeleteQueue;