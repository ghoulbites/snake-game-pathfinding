// Elements
const wrappers = document.querySelectorAll(".wrapper")
const gameDisplayWrapper = wrappers[wrappers.length - 1]
const settingsWrapper = wrappers[1]
const scoreDisplay = gameDisplayWrapper.querySelector("[data-game-score]")
const directionDisplay = gameDisplayWrapper.querySelector(
    "[data-game-snake-direction]"
)
let resetBtn

// Functions
function CreateDisplay(x, y) {
    console.time()
    let gameDisplay = gameDisplayWrapper.querySelector(".main-display")

    if (gameDisplay != null) {
        gameDisplay.innerHTML = ""
    } else {
        gameDisplay = document.createElement("div")
        gameDisplay.className = "main-display"
        gameDisplayWrapper.appendChild(gameDisplay)
    }

    for (let i = 0; i < y; i++) {
        const displayRow = document.createElement("div")
        displayRow.className = "row"

        for (let j = 0; j < x; j++) {
            let rowCell = document.createElement("div")
            rowCell.className = "cell"
            displayRow.appendChild(rowCell)
        }
        gameDisplay.appendChild(displayRow)
    }
    console.timeEnd()
}

function OpenSettings() {
    const gameDisplay = gameDisplayWrapper.querySelector(".main-display")

    settingsWrapper.style.display = "flex"
    gameDisplayWrapper.style.display = "none"

    // Unlock the fields
    const allInputs = document.querySelectorAll("input")
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].disabled = false
    }

    gameDisplay.remove()
}

function CloseSettings() {
    const gameDisplay = gameDisplayWrapper.querySelector(".main-display")
    gameDisplay.remove()

    settingsWrapper.style.display = "none"
    gameDisplayWrapper.style.display = "flex"

    // Unlock the fields
    const allInputs = document.querySelectorAll("input")
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].disabled = true
    }
}

function Initialization(hide = false) {
    if (hide) {
        CloseSettings()
    }
}
