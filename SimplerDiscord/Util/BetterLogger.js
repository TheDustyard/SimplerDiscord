const colors = require("colors");

class BetterLogger {
    constructor(handler) {
        this.handler = handler;
    }

    start() {
        process.stdout.write("\x1Bc");

        var readline = require('readline'),
            util = require('util');

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            completer: this.handler.completer
        });

        var that = this;

        rl.setPrompt("> ", 2);
        rl.on("line", function (line) {
            that.handler.handle(line, that);
            rl.prompt();
        });
        rl.on('close', function () {
            return process.exit(1);
        });
        rl.on("SIGINT", function () {
            rl.clearLine();
            rl.question("Confirm exit : ", function (answer) {
                return answer.match(/^o(ui)?$/i) || answer.match(/^y(es)?$/i) ? process.exit(1) : rl.output.write("> ");
            });
        });
        rl.prompt();

        var fu = function (type, args) {
            var t = Math.ceil((rl.line.length + 3) / process.stdout.columns);
            var text = util.format.apply(console, args);
            rl.output.write("\n\x1B[" + t + "A\x1B[0J");
            switch (type) {
                case "log":
                    rl.output.write(text + "\n").bold;
                    break;
                case "warn":
                    rl.output.write(`[WARN] ${text}`.yellow.bold + "\n");
                    break;
                case "info":
                    rl.output.write(`[INFO] ${text}`.grey.bold + "\n");
                    break;
                case "error":
                    rl.output.write(`[ERROR] ${text}`.red.bold + "\n");
                    break;
                default:
                    rl.output.write(`${text}` + "\n");
                    break;
            }
            rl.output.write(Array(t).join("\n\x1B[E"));
            rl._refreshLine();
        };

        console.log = function () {
            fu("log", arguments);
        };
        console.warn = function () {
            fu("warn", arguments);
        };
        console.info = function () {
            fu("info", arguments);
        };
        console.error = function () {
            fu("error", arguments);
        };

        console.log(">>BetterLogger: Started");
    }
}

module.exports = BetterLogger;