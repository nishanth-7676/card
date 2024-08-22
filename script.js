const cardsArray = [
    'Apple', 'Apple',
    'Ball', 'Ball',
    'Cat', 'Cat',
    'Dog', 'Dog',
    'Egg', 'Egg',
    'Fruit', 'Fruit',
    'Goat', 'Goat',
    'Horse', 'Horse'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matched = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    shuffle(cardsArray);

    cardsArray.forEach((cardValue) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', cardValue);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');
    this.textContent = this.getAttribute('data-value');

    if (!firstCard) {
        firstCard = this;
    } 
    else {
        secondCard = this;
    }
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];

}

function restartGame() {
    matched = 0;
    createBoard();
}

document.getElementById('restartButton').addEventListener('click', restartGame);

createBoard();
