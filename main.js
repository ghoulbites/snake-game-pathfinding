const scoreDisplay = document.querySelector(".score-display")
const mainDisplay = document.querySelector(".main-display")

const numRows = 5;
const numColumns = 5;

let snake = {
    headX: Math.floor(numColumns / 2),
    headY: Math.floor(numRows / 2),
    body: []
}


function CreateBoard(x, y, display) {
    let board = document.createElement("div")
    board.className = "board-display"

    for (let i = 0; i < y; i++) {
        let rowContainer = document.createElement("div")
        rowContainer.className = "board-row"
        
        for (let j = 0; j < x; j++) {
            let boardSquare = document.createElement("div")
            boardSquare.className = "board-square"
            rowContainer.appendChild(boardSquare)
        }

        board.appendChild(rowContainer)
    }
    display.appendChild(board)
}

function DrawFood() {
    let x = null
    let y = null

    while ((x == null && y == null)) {
        x = Math.floor(Math.random() * numColumns)
        y = Math.floor(Math.random() * numRows)
        while (snake.body.includes([x,y])) {
            x = Math.floor(Math.random() * numColumns)
            y = Math.floor(Math.random() * numRows)
        }
    }

    let rowFood = document.querySelectorAll(".board-row")[y]
    let columnFood = rowFood.querySelectorAll(".board-square")[x]

    columnFood.style.backgroundColor = "red"
}

function DrawSnake() {
    let headRow = document.querySelectorAll(".board-row")[snake.headY]
    let headSquare = headRow.querySelectorAll(".board-square")[snake.headX]

    headSquare.style.backgroundColor = "green"

    for (let i = 0; i < snake.body.length; i++) {
        console.log(snake.body);
        let bodyRow = document.querySelectorAll(".board-row")[snake.body[i][1]]
        let bodySquare = bodyRow.querySelectorAll(".board-square")[snake.body[i][0]]

        bodySquare.style.backgroundColor = "blue"
    }
}


CreateBoard(numColumns, numRows, mainDisplay)
DrawFood()
snake.body.push([snake.headX + 1, snake.headY])
DrawSnake()