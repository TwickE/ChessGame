const pieceSelected = "#f4f774"
let turn = "W";

//Color the tiles and remove hint moves
function coloring() {
    const tiles = document.querySelectorAll('.tile');
    let isEvenRow = false;
    let counter = 0;

    tiles.forEach(tile => {
        if(counter % 8 === 0) {
            isEvenRow = !isEvenRow;
        }
        if((isEvenRow && counter % 2 === 0) || (!isEvenRow && counter % 2 !== 0)) {
            tile.style.backgroundColor = '#eaebc8';
        }else {
            tile.style.backgroundColor = '#638644';
        }
        if(tile.classList.contains('hintMove')) {
            tile.classList.remove('hintMove');
        }
        if(tile.classList.contains('hintEat')) {
            tile.classList.remove('hintEat');
        }
        counter++;
    });
}
coloring();

//Inserting the Images
function insertImage() {
    document.querySelectorAll('.tile').forEach(image => {
        if (image.innerText.length !== 0) {
            image.innerHTML = `${image.innerText} <img class='img' src="/images/${image.innerText}.png" alt="${image.innerText}">`;
            image.style.cursor = 'pointer';
        }
    });
}
insertImage();


document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', function() {
        coloring();
        if(tile.innerText.length !== 0) {
            if(tile.innerText[0] === turn) {
                tile.style.backgroundColor = pieceSelected;
                const pieceName = tile.innerText.slice(1);
                const position = tile.id;
                moves(pieceName, position);
            }
        }
    });
}); 

//Move the pieces
function moves(pieceName, position) {
    const moves = [];
    //convert position to coordinates
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const row = parseInt(position[0]);
    const col = letters.indexOf(position[1]) + 1;
    console.log(row, col);

    //PAWN
    if(pieceName === "pawn") {
        //check if pawn is on starting position
        let isFirstMove = false;
        if (row === 2 && turn === "W") {
            isFirstMove = true;
        }else if(row === 7 && turn === "B") {
            isFirstMove = true;
        }

        //calculate possible moves
        if(isFirstMove) {
            //can move one or two tiles forward
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row + 1, col]);
                moves.push([row + 2, col]);
            }

            //can move one tile diagonally forward if there is an enemy piece to eat
            try {
                if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row + 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
            
        }else {
            //can move one tile forward
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row + 1, col]);
            }

            //can move one tile diagonally forward if there is an enemy piece to eat
            try {
                if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row + 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row + 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }
    }

    //ROOK
    if(pieceName === "rook") {
        const enemiesColumn = [];
        const columnScore = [];
        const enemiesRow = [];
        const rowScore = [];

        //check all tiles in the same row
        for(let i = 1; i <= 8; i++) {
            if(i !== col) {
                if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                    moves.push([row, i]);
                }
                if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                    enemiesRow.push([row, i]);
                }
            }
        }

        //check all tiles in the same column
        for(let i = 1; i <= 8; i++) {
            if(i !== row) {
                if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                    moves.push([i, col]);
                }
                if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                    enemiesColumn.push([i, col]);
                }
            }
        }

        try {
            enemiesColumn.forEach(enemy => {
                //check for the closest enemy piece
                columnScore.push(Math.abs(enemy[0] - row));
            });
            const colWinner = (columnScore.reduce((a, b) => Math.min(a, b)));
            const colWinnerIndex = columnScore.indexOf(colWinner);
            moves.push(enemiesColumn[colWinnerIndex]);
        }catch(err) {
            console.log(err);
        }

        try {
            enemiesRow.forEach(enemy => {
                //check for the closest enemy piece
                rowScore.push(Math.abs(enemy[1] - col));
            });
            const rowWinner = (rowScore.reduce((a, b) => Math.min(a, b)));
            const rowWinnerIndex = rowScore.indexOf(rowWinner);
            moves.push(enemiesRow[rowWinnerIndex]);
        }catch(err) {
            console.log(err);
        }
    }

    //convert coordinates back to position format
    const validMoves = [];
    moves.forEach(move => {
        const row = move[0];
        const col = move[1];
        const position = `${row}${letters[col - 1]}`;
        validMoves.push(position);
    });
    console.log(validMoves);
    giveHints(validMoves);
}

//Check if there is a piece on the tile and if it is an enemy piece
function checkForPiece(position, myColor) {
    const tile = document.getElementById(position);
    if(tile.innerText.length !== 0) {
        if(tile.innerText[0] !== myColor) {
            return "pieceEnemy";
        }else {
            return "pieceTeam";
        }
    }else {
        return "noPiece";
    }
}

//Give hints to the valid moves
function giveHints(validMoves) {
    validMoves.forEach(move => {
        const tile = document.getElementById(move);
        if(tile.innerText.length !== 0) {
            tile.classList.add('hintEat');
        }else {
            tile.classList.add('hintMove');
        }
    });
}

/* document.addEventListener("keydown", function(event) {
    if(event.key == "Enter") {
        const body = document.querySelector('body');
        body.style.backgroundColor = '#353333';

        const alert = document.querySelector('.container-turn');
        alert.style.visibility = 'visible';
        alert.style.opacity = '1';
        alert.style.backgroundColor = '#353333';
        alert.style.border = '3px solid #c9c9c9';
        alert.style.borderRadius = '10px';

        const turn = document.getElementById('turn');
        turn.style.color = '#c9c9c9';
        turn.innerText = "Black's Turn";

        setTimeout(function(){
            alert.style.visibility = 'hidden';
            alert.style.opacity = '0';
       }, 1000);
    }
}); */