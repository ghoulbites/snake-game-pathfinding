const wrappers = document.querySelectorAll(".wrapper")
const gameDisplayContainer = wrappers[wrappers.length - 1]
const scoreDisplay = document.querySelector("[data-game-score]")
const directionDisplay = document.querySelector("[data-game-snake-direction]")

// Set maximum width and height
document.addEventListener("DOMContentLoaded", () => {
    let maximumHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    let maximumWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    );

    console.log("Loaded");
    console.log("Height: " + maximumHeight)
    console.log("Width: " + maximumWidth)
})
const logSize = () => {
    let maximumHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    let maximumWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    );

    console.log("Height: " + maximumHeight)
    console.log("Width: " + maximumWidth)
}
new ResizeObserver(logSize).observe(wrappers[0]);

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
