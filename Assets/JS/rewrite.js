const wrappers = document.querySelectorAll(".wrapper")
const gameDisplayContainer = wrappers[wrappers.length - 1]
const scoreDisplay = document.querySelector("[data-game-score]")
const directionDisplay = document.querySelector("[data-game-snake-direction]")

/*
// Set maximum width and height
document.addEventListener("DOMContentLoaded", () => {
    let maximumHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    )
    let maximumWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    )

    // console.log("Loaded")
    // console.log("Height: " + maximumHeight)
    // console.log("Width: " + maximumWidth)
})
const logSize = () => {
    let maximumHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    )
    let maximumWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    )

    console.log("Height: " + maximumHeight)
    console.log("Width: " + maximumWidth)
}
new ResizeObserver(logSize).observe(wrappers[0])
*/

function CreateDisplay(x, y) {
    const gameDisplay = document.querySelector(".main-display")

    if (gameDisplay != null) {
        gameDisplay.innerHTML = ""
    } else {
        gameDisplay = document.createElement("div")
        gameDisplay.className = "main-display"
        gameDisplayContainer.appendChild(gameDisplay)
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

        displayDocumentFrag.appendChild(rowDocumentFragment)
    }
    gameDisplay.appendChild(displayDocumentFrag)
}

// Elements
const formElement = document.querySelector("form")
const sizeInputs = document.querySelectorAll("input[type='number']")
const widthInput = sizeInputs[0]
const heightInput = sizeInputs[1]
const difficultyRadioInputs = document.querySelectorAll("input[type='radio']")
const defaultCheckedDifficultyInput = document.querySelector(
    "input[name='difficultyRadio'][checked]"
)
const rangeInputs = document.querySelectorAll("input[type='range']")
const widthRangeInput = rangeInputs[0]
const heightRangeInput = rangeInputs[1]
const submitBtn = formElement.querySelector("button")

//#region Game Settings
// Game Options
let difficultyChosen = defaultCheckedDifficultyInput.value
let boardWidth = widthInput.value
let boardHeight = heightInput.value

// Set default values for the range inputs for page load
widthRangeInput.value = boardWidth
heightRangeInput.value = boardHeight
widthRangeInput.min = widthInput.min
heightRangeInput.min = heightInput.min
widthRangeInput.max = widthInput.max
heightRangeInput.max = heightInput.max

for (let i = 0; i < difficultyRadioInputs.length; i++) {
    difficultyRadioInputs[i].addEventListener("change", (event) => {
        difficultyChosen = event.target.value
    })
}
widthRangeInput.addEventListener("input", (event) => {
    widthInput.value = event.target.value
})
heightRangeInput.addEventListener("input", (event) => {
    heightInput.value = event.target.value
})
widthInput.addEventListener("input", () => {
    if (Number(widthInput.value) > widthInput.max) {
        widthInput.value = widthInput.max
    }
    if (widthInput.value != "") {
        widthRangeInput.value = widthInput.value
    } else {
        widthRangeInput.value = widthInput.min
    }
})
heightInput.addEventListener("input", () => {
    if (Number(heightInput.value) > heightInput.max) {
        heightInput.value = heightInput.max
    }
    if (heightInput.value != "") {
        heightRangeInput.value = heightInput.value
    } else {
        heightRangeInput.value = heightInput.min
    }
})

// Finalize settings,
// lock the form fields,
// hide the form,
// and create the display
submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("ran here")

    // Finalize settings
    boardWidth = widthInput.value
    boardHeight = heightInput.value

    // Lock the fields
    const allInputs = document.querySelectorAll("input")
    for (let i = 0; i < allInputs.length; i++) {
        console.log("ran")
        allInputs[i].disabled = true
    }
})
//#endregion
