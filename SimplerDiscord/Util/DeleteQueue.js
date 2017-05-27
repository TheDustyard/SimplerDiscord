class DeleteQueue {

    constructor() {
        this.todelete = [];
        this.start();
    }

    add(message, delay) {
        this.todelete.push({ message: message, delay: new Date().valueOf() + delay });
    }

    tick(queue) {
        for (var index in queue.todelete) {
            if (queue.todelete[index].delay < new Date().valueOf()) {
                queue.todelete[index].message.delete();
                delete queue.todelete[index];
            }
        }
        //console.log(queue.todelete);
    }

    start() {
        this.interval = setInterval(this.tick, 1000, this);
    }

    stop() {
        this.interval.stop();
    }

}

module.exports = DeleteQueue;