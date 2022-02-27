const wrappers = document.querySelectorAll(".wrapper")
const container = wrappers[wrappers.length - 1]
const scoreDisplay = document.querySelector("[data-game-score]")
const directionDisplay = document.querySelector("[data-game-direction]")

const Width = 500
const Height = 500

let FoodX = Math.floor(Math.random() * Width)
let FoodY = Math.floor(Math.random() * Height)

let directionX = -1
let directionY = 0
let previousDirectionX = null
let previousDirectionY = null
let directionText = "Left"

// Initialize the snake object with the head at the exact center and 2 body tiles directly to the right of it
let snake = {
    snakeHeadX: Math.floor(Width / 2),
    snakeHeadY: Math.floor(Height / 2),
    snakeBody: [],
    Score: 0,
}
snake.snakeBody.push([snake.snakeHeadX + 1, snake.snakeHeadY])
snake.snakeBody.push([snake.snakeHeadX + 2, snake.snakeHeadY])

/* 
function CreateDisplay(x, y) {
    console.time()
    let gameDisplay = document.querySelector(".main-display")

    if (gameDisplay != null) {
        gameDisplay.innerHTML = ""
    } else {
        gameDisplay = document.createElement("div")
        gameDisplay.className = "main-display"
        container.appendChild(gameDisplay)
    }

    for (let i = 0; i < y; i++) {
        let displayRow = document.createElement("div")
        displayRow.className = "row"

        for (let j = 0; j < x; j++) {
            let rowItem = document.createElement("div")
            rowItem.className = "cell"
            displayRow.appendChild(rowItem)
        }

        gameDisplay.appendChild(displayRow)
    }
    console.timeEnd()
}
*/
/**/
function CreateDisplay(x, y) {
    console.time()
    let gameDisplay = document.querySelector(".main-display")

    if (gameDisplay != null) {
        gameDisplay.innerHTML = ""
    } else {
        gameDisplay = document.createElement("div")
        gameDisplay.className = "main-display"
        container.appendChild(gameDisplay)
    }

    const displayDocumentFrag = document.createDocumentFragment()
    for (let i = 0; i < y; i++) {
        const displayRow = document.createElement("div")
        displayRow.className = "row"

        const rowDocumentFragment = document.createDocumentFragment()
        for (let j = 0; j < x; j++) {
            let rowCell = document.createElement("div")
            rowCell.className = "cell"
            rowDocumentFragment.appendChild(rowCell)
        }
        displayRow.appendChild(rowDocumentFragment)
        displayDocumentFrag.appendChild(displayRow)
    }
    gameDisplay.appendChild(displayDocumentFrag)
    console.timeEnd()
}

function RenderSnake() {
    let headRow = document.querySelectorAll(".row")[snake.snakeHeadY]
    let headCell = headRow.querySelectorAll(".cell")[snake.snakeHeadX]
    headCell.style.backgroundColor = "var(--green)"

    for (let i = 0; i < snake.snakeBody.length; i++) {
        let bodyRow = document.querySelectorAll(".row")[snake.snakeBody[i][1]]
        let bodyCellRow = bodyRow.querySelectorAll(".cell")[snake.snakeBody[i][0]]
        bodyCellRow.style.backgroundColor = "var(--body-main)"
    }
}

function GetFoodCoordinates() {
    return [Math.floor(Math.random() * Width), Math.floor(Math.random() * Height)]
}

function CheckClashInFoodCreation() {
    while (FoodX == snake.snakeHeadX && FoodY == snake.snakeHeadY) {
        ;[FoodX, FoodY] = GetFoodCoordinates()
    }
    for (let i = 0; i < snake.snakeBody.length; i++) {
        if (FoodX == snake.snakeBody[i][0] && FoodY == snake.snakeBody[i][1]) {
            ;[FoodX, FoodY] = GetFoodCoordinates()
            return CheckClashInFoodCreation()
        }
    }
}

function CreateFood() {
    CheckClashInFoodCreation()
    while (FoodX == snake.snakeHeadX && FoodY == snake.snakeHeadY) {
        ;[FoodX, FoodY] = GetFoodCoordinates()
    }
    for (let i = 0; i < snake.snakeBody.length; i++) {
        if (FoodX == snake.snakeBody[i][0] && FoodY == snake.snakeBody[i][1]) {
            ;[FoodX, FoodY] = GetFoodCoordinates()
            return CheckClashInFoodCreation()
        }
    }

    console.log("Food Row: " + (FoodY + 1) + ", Food Column: " + (FoodX + 1))

    let headRow = document.querySelectorAll(".row")[FoodY]
    let headCell = headRow.querySelectorAll(".cell")[FoodX]
    headCell.style.backgroundColor = "var(--red)"
}

function ChangeScore() {
    scoreDisplay.textContent = "Score: " + snake.Score
    CreateFood()
}

function MoveSnake() {
    let bodyRow = document.querySelectorAll(".row")[snake.snakeBody[snake.snakeBody.length - 1][1]]
    let bodyCellRow = bodyRow.querySelectorAll(".cell")[snake.snakeBody[snake.snakeBody.length - 1][0]]
    bodyCellRow.style.backgroundColor = "var(--black-main)"

    snake.snakeBody.unshift([snake.snakeHeadX, snake.snakeHeadY])

    snake.snakeHeadX += directionX
    snake.snakeHeadY += directionY

    if (snake.snakeHeadX < 0 || snake.snakeHeadX > Width - 1 || snake.snakeHeadY < 0 || snake.snakeHeadY > Height - 1) {
        Reset()
        return alert("You have gone out of bounds, you lose!")
    }

    if (snake.snakeHeadX == FoodX && snake.snakeHeadY == FoodY) {
        snake.Score += 1
        ChangeScore()
    } else {
        snake.snakeBody.pop()
    }

    RenderSnake()

    for (let i = 0; i < snake.snakeBody.length; i++) {
        if (snake.snakeHeadX == snake.snakeBody[i][0] && snake.snakeHeadY == snake.snakeBody[i][1]) {
            Reset()
            return alert("Oof, you ate yourself, tsk tsk...")
        }
    }
}

function ChangeDirection() {
    directionDisplay.textContent = "Direction: " + directionText
}

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft" && previousDirectionX != 1) {
        previousDirectionX = -1
        previousDirectionY = 0
        directionX = -1
        directionY = 0
        directionText = "Left"
    } else if (event.key == "ArrowRight" && previousDirectionX != -1) {
        previousDirectionX = 1
        previousDirectionY = 0
        directionX = 1
        directionY = 0
        directionText = "Right"
    } else if (event.key == "ArrowUp" && previousDirectionY != 1) {
        previousDirectionX = 0
        previousDirectionY = -1
        directionX = 0
        directionY = -1
        directionText = "Up"
    } else if (event.key == "ArrowDown" && previousDirectionY != -1) {
        previousDirectionX = 0
        previousDirectionY = 1
        directionX = 0
        directionY = 1
        directionText = "Down"
    }

    ChangeDirection()
})

function Initialization() {
    CreateDisplay(Width, Height)
    RenderSnake()
    ChangeScore()
    ChangeDirection()
}

function Reset() {
    FoodX = Math.floor(Math.random() * Width)
    FoodY = Math.floor(Math.random() * Height)

    directionX = -1
    directionY = 0
    previousDirectionX = null
    previousDirectionY = null

    directionText = "Left"

    snake.Score = 0
    snake.snakeHeadX = Math.floor(Width / 2)
    snake.snakeHeadY = Math.floor(Height / 2)
    snake.snakeBody = [
        [snake.snakeHeadX + 1, snake.snakeHeadY],
        [snake.snakeHeadX + 2, snake.snakeHeadY],
    ]

    Initialization()
}

Initialization()

//let animation = setInterval(MoveSnake, 300)
