let blackJack = {
    'You': { 'scorespan': '#player-result', 'div': '#player_area', 'score': 0 },
    'bot': { 'scorespan': '#dealer-result', 'div': '#dealer_area', 'score': 0 },
    'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'suit': ['H', 'S', 'C', 'D'],
    'cardValue': {
        '2C': 2, '3C': 3, '4C': 4, '5C': 5, '6C': 6, '7C': 7, '8C': 8, '9C': 9, '10C': 10, 'JC': 10, 'QC': 10, 'KC': 10, 'AC': 11,
        '2S': 2, '3S': 3, '4S': 4, '5S': 5, '6S': 6, '7S': 7, '8S': 8, '9S': 9, '10S': 10, 'JS': 10, 'QS': 10, 'KS': 10, 'AS': 11,
        '2D': 2, '3D': 3, '4D': 4, '5D': 5, '6D': 6, '7D': 7, '8D': 8, '9D': 9, '10D': 10, 'JD': 10, 'QD': 10, 'KD': 10, 'AD': 11,
        '2H': 2, '3H': 3, '4H': 4, '5H': 5, '6H': 6, '7H': 7, '8H': 8, '9H': 9, '10H': 10, 'JH': 10, 'QH': 10, 'KH': 10, 'AH': 11
    },
    'scoreboard': { 'win': 0, 'lose': 0 }

}


const You = blackJack['You'];
const dealer = blackJack['bot'];
const bgsound = new Audio("PNG-cards-1.3/Bricks and Stones loops - Royalty Free Music.mp3");
const hitsound = new Audio("PNG-cards-1.3/card_shuffle.mp3");
const bustsound = new Audio("PNG-cards-1.3/mixkit-losing-piano-2024.wav");
const winsound = new Audio("PNG-cards-1.3/mixkit-winning-chimes-2015.wav");
const losesound = new Audio("PNG-cards-1.3/Sad_Trombone-Joe_Lamb-665429450.mp3");

document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#stand').addEventListener('click', stand);
document.querySelector('#new').addEventListener('click', newgame);
// document.querySelector('#flex-score').addEventListener('loadedmetadata', hideTable);

function hit() {
    let card = randomcard();
    showCard(card, You);
    updateScore(card, You);
    showScore(You);
    showTable();
}
function stand() {
    let f = Math.floor(Math.random() * 2);
    let arr = [2, 3];

    for (let i = 0; i < arr[f]; i++) {
        let card = randomcard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);
    }
    if (arr[f] == 2 && dealer['score'] <= 13 && dealer['score'] != 0) {
        let card = randomcard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);
    }



    // winner

    let winner;
    if (You['score'] > dealer['score'] && You['score'] <= 21) {
        winner = 'You win!';
        winsound.play();
        console.log(winner);
    }
    else if (You['score'] > 21 && dealer['score'] <= 21) {
        winner = 'You lose!';
        losesound.play();
        console.log(winner);
    }
    else if (dealer['score'] > 21 && You['score'] <= 21) {
        winner = 'You win!';
        winsound.play();
        console.log(winner);
    }
    else if (dealer['score'] > You['score'] && dealer['score'] <= 21) {
        winner = 'You lose!';
        losesound.play();
        console.log(winner);
    }
    else if (You['score'] > 21 || dealer['score'] > 21 || dealer['score'] === You['score']) {
        winner = 'Draw';
        console.log(winner);
    }
    document.querySelector('#black_jack_play').textContent = winner;
    document.querySelector(dealer['scorespan']).style.color = 'white';
    document.querySelector(You['scorespan']).style.color = 'white';


    // table

    if (winner == "You win!") {
        blackJack['scoreboard']['win'] += 1;
        document.querySelector('.player-score').textContent = blackJack['scoreboard']['win'];
    }
    else if (winner == 'You lose!') {
        blackJack['scoreboard']['lose'] += 1;
        document.querySelector('.dealer-score').textContent = blackJack['scoreboard']['lose'];
    }
}
function newgame() {
    let Yourimg = document.querySelector('#player_area').querySelectorAll('img');
    let dealerimg = document.querySelector('#dealer_area').querySelectorAll('img');
    for (let i = 0; i < Yourimg.length; i++) {
        Yourimg[i].remove();
    }
    for (let i = 0; i < dealerimg.length; i++) {
        dealerimg[i].remove();
    }

    You['score'] = 0;
    dealer['score'] = 0;
    document.querySelector(You['scorespan']).textContent = You['score'];
    document.querySelector(You['scorespan']).style = 'color:black';
    document.querySelector(dealer['scorespan']).style = 'color:black';
    document.querySelector(dealer['scorespan']).textContent = dealer['score'];
    document.querySelector('#black_jack_play').textContent = "Lets Play!";
}

function randomcard() {
    let cardNumber = Math.floor(Math.random() * 13);
    let cardSuit = Math.floor(Math.random() * 4);
    return (blackJack['card'][cardNumber] + blackJack['suit'][cardSuit]);
}
function showCard(card, activePlayer) {
    let cardImg = document.createElement('img');
    cardImg.src = `PNG-cards-1.3/${card}.png`
    cardImg.style = 'height:150px';
    if (activePlayer['score'] < 21) {
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        hitsound.play();
        bgsound.play();
    }
    else {
        bustsound.play();
    }
}
function showScore(activePlayer) {
    console.log(activePlayer['score'])

    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    } else {
        document.querySelector(activePlayer['scorespan']).style = 'color:red';
        document.querySelector(activePlayer['scorespan']).textContent = 'Bust!';
        bustsound.play();
    }
}
function updateScore(card, activePlayer) {
    activePlayer['score'] += blackJack['cardValue'][card];
}
function showTable() {
    document.getElementById('flex-score').style.visibility = "visible";
}
function hideTable() {
    document.getElementById('flex-score').style.visibility = "hidden";
}