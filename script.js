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

// Inserting the Images
function insertImage() {
    document.querySelectorAll('.tile').forEach(image => {
        if (image.innerText.length !== 0) {
            image.innerHTML = `${image.innerText} <img class='img' src="/images/${image.innerText}.png" alt="${image.innerText}">`;
            image.style.cursor = 'pointer';
        }
    });
}
insertImage();

document.addEventListener("keydown", function(event) {
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
});