module.exports = class {
    constructor (terminal) {
        this.terminal = terminal;
    }

    box (startY, startX, endY, endX, boxChar = {
        topL : "╔",
        bottomL : "╚",
        topR : "╗",
        bottomR : "╝",
        vertical : "║",
        horizontal : "═"
    }) {
        this.terminal.buffer[startY][startX] = boxChar.topL;
        this.terminal.buffer[endY][startX] = boxChar.bottomL;
        this.terminal.buffer[startY][endX] = boxChar.topR;
        this.terminal.buffer[endY][endX] = boxChar.bottomR;

        this.terminal.draw.textIntoX(startY, startX + 1, boxChar.horizontal.repeat(endX - startX - 1));
        this.terminal.draw.textIntoX(endY, startX + 1, boxChar.horizontal.repeat(endX - startX - 1));

        this.terminal.draw.textIntoY(startY + 1, startX, boxChar.vertical.repeat(endY - startY - 1));
        this.terminal.draw.textIntoY(startY + 1, endX, boxChar.vertical.repeat(endY - startY - 1));
    }

    textIntoX (y, x, text) {
        this.arrayToX(y, x, text.split(""));
    }

    textIntoY (y, x, text) {
        this.arrayToY(y, x, text.split(""));
    }

    arrayToX (y, x, array) {
        array.forEach((elem, idx) => this.terminal.buffer[y][x + idx] = elem);
    }

    arrayToY (y, x, array) {
        array.forEach((elem, idx) => this.terminal.buffer[y + idx][x] = elem);
    }

    d2toBuffer (y, x, array) {
        array.forEach((row, yOffset) => {
            this.arrayToX(y + yOffset, x, row);
        })
    }
}