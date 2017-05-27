class DeleteQueue {

    constructor() {
        this.todelete = [];
        this.start();
    }

    add(id, delay) {
        this.todelete.push({ id: id, delay: new Date().valueOf() + delay });
    }

    tick(queue) {
        for (var index in queue.todelete) {
            console.log(queue.todelete[index]);
        }
        console.log(queue.todelete);
    }

    start() {
        this.interval = setInterval(this.tick, 1000, this);
    }

    stop() {
        this.interval.stop();
    }

}

module.exports = DeleteQueue;