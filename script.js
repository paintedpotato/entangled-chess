document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chessboard');
    const rows = 8;
    const cols = 8;
    let selectedPiece = null;
    let selectedSquare = null;

    const initialBoard = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ];

    function createBoard() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;

                if (initialBoard[row][col]) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece');
                    piece.textContent = initialBoard[row][col];
                    square.appendChild(piece);
                }

                square.addEventListener('click', onSquareClick);
                board.appendChild(square);
            }
        }
    }

    function onSquareClick(e) {
        const square = e.currentTarget;
        const piece = square.querySelector('.piece');

        if (selectedPiece) {
            if (piece && piece === selectedPiece) {
                deselectPiece();
            } else {
                movePiece(square);
            }
        } else if (piece) {
            selectPiece(square);
        }
    }

    function selectPiece(square) {
        selectedPiece = square.querySelector('.piece');
        selectedSquare = square;
        selectedSquare.style.outline = '3px solid yellow';
    }

    function deselectPiece() {
        selectedSquare.style.outline = '';
        selectedPiece = null;
        selectedSquare = null;
    }

    function movePiece(targetSquare) {
        targetSquare.appendChild(selectedPiece);
        deselectPiece();
    }

    createBoard();
});
