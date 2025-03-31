const boardSize = 4;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));

function generateTile() {
    let emptyTiles = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) emptyTiles.push({ r, c });
        }
    }
    if (emptyTiles.length > 0) {
        let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() > 0.1 ? 2 : 4; // 90% de chance de ser 2, 10% de ser 4
    }
}

function drawBoard() {
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    board.forEach(row => {
        row.forEach(num => {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = num !== 0 ? num : "";
            boardDiv.appendChild(tile);
        });
    });
}

function moveLeft() {
    for (let r = 0; r < boardSize; r++) {
        let row = board[r].filter(num => num !== 0); // Remove zeros
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                row.splice(i + 1, 1);
            }
        }
        while (row.length < boardSize) row.push(0); // Preenche com zeros à direita
        board[r] = row;
    }
}

function rotateBoard() {
    let newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            newBoard[c][boardSize - 1 - r] = board[r][c];
        }
    }
    board = newBoard;
}

function handleInput(event) {
    let moved = false;
    if (event.key === "ArrowLeft") {
        moveLeft();
        moved = true;
    } else if (event.key === "ArrowRight") {
        rotateBoard();
        rotateBoard();
        moveLeft();
        rotateBoard();
        rotateBoard();
        moved = true;
    } else if (event.key === "ArrowUp") {
        rotateBoard();
        rotateBoard();
        rotateBoard();
        moveLeft();
        rotateBoard();
        moved = true;
    } else if (event.key === "ArrowDown") {
        rotateBoard();
        moveLeft();
        rotateBoard();
        rotateBoard();
        rotateBoard();
        moved = true;
    }

    if (moved) {
        generateTile();
        drawBoard();
    }
}

document.addEventListener("keydown", handleInput);

// Inicializa o jogo
generateTile();
generateTile();
drawBoard();
