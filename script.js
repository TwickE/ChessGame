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
                console.log(pieceName, position);
                const moves = hintMoves(pieceName, position);
                movePiece(moves, pieceName, position);
            }
        }
    });
}); 

//Give the hints to where the pieces can move
function hintMoves(pieceName, position) {
    const moves = [];
    //convert position to coordinates
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const row = parseInt(position[0]);
    const col = letters.indexOf(position[1]) + 1;
    console.log(row, col);
    console.log(pieceName);
    //PAWN
    if(pieceName === "pawn ") {
        //check if pawn is on starting position
        let isFirstMove = false;
        if (row === 2 && turn === "W") {
            isFirstMove = true;
        }else if(row === 7 && turn === "B") {
            isFirstMove = true;
        }

        //calculate possible moves
        if(isFirstMove && turn === "W") {
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
            
        }else if(turn === "W") {
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
        if(isFirstMove && turn === "B") {
            //can move one or two tiles forward
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row - 1, col]);
                moves.push([row - 2, col]);
            }

            //can move one tile diagonally forward if there is an enemy piece to eat
            try {
                if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row - 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }else if(turn === "B") {
            //can move one tile forward
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) === "noPiece"){
                moves.push([row - 1, col]);
            }

            //can move one tile diagonally forward if there is an enemy piece to eat
            try {
                if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col - 1]);
                }
            }catch(err) {
                console.log(err);
            }
            try {
                if(checkForPiece(`${row - 1}${letters[col]}`, turn) === "pieceEnemy") {
                    moves.push([row - 1, col + 1]);
                }
            }catch(err) {
                console.log(err);
            }
        }
    }

    //ROOK
    if(pieceName === "rook ") {
        //can move to the top
        for(let i = row + 1; i <= 8; i++) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom
        for(let i = row - 1; i >= 1; i--) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //can move to the right
        for(let i = col + 1; i <= 8; i++) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
        //can move to the left
        for(let i = col - 1; i >= 1; i--) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
    }

    //KNIGHT
    if(pieceName === "knight ") {
        //can move two tiles up and one tile to the right
        try {
            if(checkForPiece(`${row + 2}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row + 2, col + 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move two tiles up and one tile to the left
        try {
            if(checkForPiece(`${row + 2}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row + 2, col - 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move two tiles down and one tile to the right
        try {
            if(checkForPiece(`${row - 2}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row - 2, col + 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move two tiles down and one tile to the left
        try {
            if(checkForPiece(`${row - 2}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row - 2, col - 1]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move one tile up and two tiles to the right
        try {
            if(checkForPiece(`${row + 1}${letters[col + 1]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col + 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move one tile up and two tiles to the left
        try {
            if(checkForPiece(`${row + 1}${letters[col - 3]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col - 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move one tile down and two tiles to the right
        try {
            if(checkForPiece(`${row - 1}${letters[col + 1]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col + 2]);
            }
        }catch(err) {
            console.log(err);
        }
        //can move one tile down and two tiles to the left
        try {
            if(checkForPiece(`${row - 1}${letters[col - 3]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col - 2]);
            }
        }catch(err) {
            console.log(err);
        }
    }

    //BISHOP
    if(pieceName === "bishop ") {
        //can move to the top right
        for(let i = row + 1, j = col + 1; i <= 8 && j <= 8; i++, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the top left
        for(let i = row + 1, j = col - 1; i <= 8 && j >= 1; i++, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom right
        for(let i = row - 1, j = col + 1; i >= 1 && j <= 8; i--, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom left
        for(let i = row - 1, j = col - 1; i >= 1 && j >= 1; i--, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
    }

    //QUEEN
    if(pieceName === "queen ") {
        //can move to the top right
        for(let i = row + 1, j = col + 1; i <= 8 && j <= 8; i++, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the top left
        for(let i = row + 1, j = col - 1; i <= 8 && j >= 1; i++, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom right
        for(let i = row - 1, j = col + 1; i >= 1 && j <= 8; i--, j++) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom left
        for(let i = row - 1, j = col - 1; i >= 1 && j >= 1; i--, j--) {
            if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "noPiece") {
                moves.push([i, j]);
            }else if(checkForPiece(`${i}${letters[j - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, j]);
                break;
            }else {
                break;
            }
        }
        //can move to the top
        for(let i = row + 1; i <= 8; i++) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //can move to the bottom
        for(let i = row - 1; i >= 1; i--) {
            if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "noPiece") {
                moves.push([i, col]);
            }else if(checkForPiece(`${i}${letters[col - 1]}`, turn) === "pieceEnemy") {
                moves.push([i, col]);
                break;
            }else {
                break;
            }
        }
        //can move to the right
        for(let i = col + 1; i <= 8; i++) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
        //can move to the left
        for(let i = col - 1; i >= 1; i--) {
            if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "noPiece") {
                moves.push([row, i]);
            }else if(checkForPiece(`${row}${letters[i - 1]}`, turn) === "pieceEnemy") {
                moves.push([row, i]);
                break;
            }else {
                break;
            }
        }
    }

    //KING
    if(pieceName === "king ") {
        //can move one tile to the top right
        if(row + 1 <= 8 && col + 1 <= 8) {
            if(checkForPiece(`${row + 1}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col + 1]);
            }
        }
        //can move one tile to the top left
        if(row + 1 <= 8 && col - 1 >= 1) {
            if(checkForPiece(`${row + 1}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col - 1]);
            }
        }
        //can move one tile to the bottom right
        if(row - 1 >= 1 && col + 1 <= 8) {
            if(checkForPiece(`${row - 1}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col + 1]);
            }
        }
        //can move one tile to the bottom left
        if(row - 1 >= 1 && col - 1 >= 1) {
            if(checkForPiece(`${row - 1}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col - 1]);
            }
        }
        //can move one tile to the top
        if(row + 1 <= 8) {
            if(checkForPiece(`${row + 1}${letters[col - 1]}`, turn) !== "pieceTeam") {
                moves.push([row + 1, col]);
            }
        }
        //can move one tile to the bottom
        if(row - 1 >= 1) {
            if(checkForPiece(`${row - 1}${letters[col - 1]}`, turn) !== "pieceTeam") {
                moves.push([row - 1, col]);
            }
        }
        //can move one tile to the right
        if(col + 1 <= 8) {
            if(checkForPiece(`${row}${letters[col]}`, turn) !== "pieceTeam") {
                moves.push([row, col + 1]);
            }
        }
        //can move one tile to the left
        if(col - 1 >= 1) {
            if(checkForPiece(`${row}${letters[col - 2]}`, turn) !== "pieceTeam") {
                moves.push([row, col - 1]);
            }
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
    giveHints(validMoves);
    console.log(validMoves);
    return validMoves;
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

//Moves the piece to the selected tile
function movePiece(moves, pieceName, position) {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', function() {
            moves.forEach(move => {
                if(tile.id === move) {
                    tile.innerText = pieceName;
                    tile.innerHTML = `${turn + tile.innerText} <img class='img' src="/images/${turn + tile.innerText}.png" alt="${turn + tile.innerText}">`;
                    tile.style.cursor = 'pointer';
                    const previousTile = document.getElementById(position);
                    previousTile.innerText = "";
                    previousTile.style.cursor = "default";
                    togelTurn(turn);
                    moves = [];
                }else {
                    moves = [];
                }
            });
        });
    });
}

function togelTurn() {
    if(turn === "W") {
        turn = "B";
        const body = document.querySelector('body');
        body.style.backgroundColor = '#353333';

        const alert = document.querySelector('.container-turn');
        alert.style.visibility = 'visible';
        alert.style.opacity = '1';
        alert.style.backgroundColor = '#353333';
        alert.style.border = '3px solid #c9c9c9';
        alert.style.borderRadius = '10px';

        const turnElement = document.getElementById('turn');
        turnElement.style.color = '#c9c9c9';
        turnElement.innerText = "Black's Turn";

        setTimeout(function(){
            alert.style.visibility = 'hidden';
            alert.style.opacity = '0';
       }, 1000);
    }else {
        turn = "W";
        const body = document.querySelector('body');
        body.style.backgroundColor = '#C9C9C9';

        const alert = document.querySelector('.container-turn');
        alert.style.visibility = 'visible';
        alert.style.opacity = '1';
        alert.style.backgroundColor = '#C9C9C9';
        alert.style.border = '3px solid #353333';
        alert.style.borderRadius = '10px';

        const turnElement = document.getElementById('turn');
        turnElement.style.color = '#353333';
        turnElement.innerText = "White's Turn";

        setTimeout(function(){
            alert.style.visibility = 'hidden';
            alert.style.opacity = '0';
       }, 1000);
    }
}