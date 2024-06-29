const gameBoard = document.getElementById('game-board');
const turnIndicator = document.getElementById('turn-indicator');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');
const rows = 6;
const columns = 7;
let currentPlayer = 'red';
let board = Array(rows).fill(null).map(() => Array(columns).fill(null));

function createBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleClick(event) {
    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                gameStatus.textContent = `Player ${currentPlayer === 'red' ? 1 : 2} (${currentPlayer}) wins!`;
                turnIndicator.textContent = '';
                gameBoard.style.pointerEvents = 'none'; // Disable further clicks
                restartButton.style.display = 'block'; // Show the restart button
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            turnIndicator.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s turn (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
            break;
        }
    }
}

function checkWin(row, col) {
    // Check all directions for a win
    const directions = [
        { row: 0, col: 1 }, // Horizontal
        { row: 1, col: 0 }, // Vertical
        { row: 1, col: 1 }, // Diagonal down-right
        { row: 1, col: -1 } // Diagonal down-left
    ];

    for (let { row: dRow, col: dCol } of directions) {
        let count = 1;
        count += countInDirection(row, col, dRow, dCol);
        count += countInDirection(row, col, -dRow, -dCol);
        if (count >= 4) return true;
    }
    return false;
}

function countInDirection(row, col, dRow, dCol) {
    let count = 0;
    for (let i = 1; i < 4; i++) {
        const newRow = row + dRow * i;
        const newCol = col + dCol * i;
        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < columns &&
            board[newRow][newCol] === currentPlayer
        ) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

function resetBoard() {
    board = Array(rows).fill(null).map(() => Array(columns).fill(null));
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
    currentPlayer = 'red';
    turnIndicator.textContent = "Player 1's turn (Red)";
    gameStatus.textContent = '';
    gameBoard.style.pointerEvents = 'auto'; // Enable clicks
    restartButton.style.display ; // Hide the restart button
}

restartButton.addEventListener('click', resetBoard);

createBoard();
