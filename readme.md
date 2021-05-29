## buffer-render

`$ npm install buffer-render`  
Write and modify content on the terminal, efficiently, without re-rendering everything  
NOTE: Dynamic resize on change of terminal size is NOT supported.

---

### API

#### Terminal class
```js
const Terminal = require("buffer-render");
```

- `Terminal()` aka constructor  
    No parameters.
- `.render()`  
    No parameters. Renders the current buffer to the screen. This is probably the method you will need the most.
- `.size`  
    An Object containing the size of the terminal: `{x: <number>, y: <number>}`
- `.buffer`  
    A 2D array which represents the terminal, starting from top left. This buffer is supposed to be modified if you want to change anything on the terminal, 
    and the changes will be rendered when calling `.render()`. Indexed `[y][x]` and starts on the top left of the terminal.
- `.draw`
    An instance of the `Draw` class. See below for usage.
  
#### Draw class
```js
terminal.draw
```

- `.box(startY, startX, endY, endX, boxChar)`
    - startY : top left corner
    - startX : top right corner
    - endY : bottom left corner
    - endX : bottom right corner
    - boxChar : the characters to use for drawing, in an object (default values here): 
      ```json
      {
        "topL" : "╔",
        "bottomL" : "╚",
        "topR" : "╗",
        "bottomR" : "╝",
        "vertical" : "║",
        "horizontal" : "═"
      }
      ```
    Draws a box to the buffer.
- `.textIntoX(y, x, text)`
    - y, x : position to draw
    - text : text to draw  
    Writes some text into the buffer, horizontally.
- `.textIntoY(y, x, text)`
    - y, x : position to draw
    - text : text to draw  
    Writes some text into the buffer, vertically.
- `.arrayToX(y, x, array)`
    - y, x : position to overwrite
    - array : array to overwrite  
    Overwrites a section of the buffer with array, horizontally.
- `.arrayToY(y, x, array)`
    - y, x : position to overwrite
    - array : array to overwrite  
    Overwrites a section of the buffer with array, vertically.
- `d2ToBuffer(y, x, array)`
    - y, x : position to overwrite
    - array : array to overwrite  
    Same as `.arrayToX` or `.arrayToY`, but instead of writing in a specific direction, takes a whole
    2D array.
    