const Draw = require("./draw");

module.exports = class {
    static terminalSize () {
        return {
            x : process.stdout.columns,
            y : process.stdout.rows
        };
    }

    constructor () {
        this.size = this.constructor.terminalSize();
        this.buffer = Array(this.size.y).fill(null).map(() => Array(this.size.x).fill(" "));
        this.draw = new Draw(this);

        this.interalBuffer = Array(this.size.y).fill(null).map(() => Array(this.size.x).fill(0));
    }

    moveCursor (y, x) {
        process.stdout.write('\u001B' + "[" + (y+1) + ";" + (x+1) + "H");
    }

    diff () {
        let diff = [];

        for (let y = 0; y < this.size.y; y++) {
            diff[y] = [];

            for (let x = 0; x < this.size.x; x++) {
                diff[x] = -1;

                if (this.buffer[y][x] !== this.interalBuffer[y][x] && this.buffer[y][x] !== -1) {
                    diff[y][x] = this.buffer[y][x];
                }
            }
        }

        return diff;
    }

    render () {
        let buf = this.diff();

        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                this.interalBuffer[y][x] = this.buffer[y][x];
            }

            let strBuf = "";
            for (let x = 0; x < this.size.x; x++) {
                if (buf[y][x] === -1) {
                    if (strBuf === "") continue;

                    process.stdout.write(strBuf);
                    strBuf = "";

                    continue;
                }

                if (strBuf === "") this.moveCursor(y, x);
                strBuf += buf[y][x];
            }

            //clear at end of line
            if (strBuf !== "") {
                process.stdout.write(strBuf);
            }
        }
    }
}