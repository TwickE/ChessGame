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
            }
        }
    });
}); 

//Move the pieces
function moves(pieceName, position) {
    //PAWN
    //convert position to coordinates
    if(pieceName === "pawn") {
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const row = position[0];
        const col = letters.indexOf(position[1]) + 1;
        console.log(row, col);

        //check if pawn is on starting position
        let isFirstMove = false;
        if (row === 7 && turn === "W") {
            isFirstMove = true;
        }else if(row === 2 && turn === "B") {
            isFirstMove = true;
        }

        //calculate potential moves
        const moves = [];
        if (isFirstMove) {
            //can move one or two squares forward
            
        } else {
            //can only move one square forward
            if (row >= 1) {
            moves.push([col, row - 1]);
            }
        }

        //convert coordinates back to position format
        const validMoves = moves.map(move => String.fromCharCode(move[0] + 97) + (8 - move[1]));

        console.log(validMoves);
    }
    
}
moves("pawn", "2e");

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