'use strict';

let player1CurrentScore = document.querySelector('#current--0');
let player1TotalScore = document.querySelector('#score--0');
let player2CurrentScore = document.querySelector('#current--1');
let player2TotalScore = document.querySelector('#score--1');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollDiceBtn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let player1Turn, p1Score, p2Score, p1TotalScore, p2TotalScore, playing;
const init = () => {
  player1Turn = 1;
  p1Score = 0;
  p2Score = 0;
  p1TotalScore = 0;
  p2TotalScore = 0;
  playing = true;
  player1CurrentScore.textContent = '0';
  player2CurrentScore.textContent = '0';
  player1TotalScore.textContent = '0';
  player2TotalScore.textContent = '0';
  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};
init();
const generateRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const makeActive = player => {
  player.classList.add('player--active');
};
const makeInactive = player => {
  player.classList.remove('player--active');
};

//action1: Roll Dice
rollDiceBtn.addEventListener('click', function () {
  // generate a random number between 1 and 6
  if (playing === true) {
    let randomNumber = Math.floor(generateRandomNumber(1, 6));
    if (randomNumber === 1) {
      // check if number is 1, then clear currentPoints and change the turn to other player
      if (player1Turn) {
        p1Score = Number(0);
        makeInactive(player1);
        makeActive(player2);
      } else {
        p2Score = Number(0);
        makeActive(player1);
        makeInactive(player2);
      }
      player1Turn = 1 - player1Turn;
    } else {
      // check if number != 1, then add the number to currentPoints
      player1Turn
        ? (p1Score += Number(randomNumber))
        : (p2Score += Number(randomNumber));
    }
    // display the dice which matches the random number
    const imageName = `dice-${randomNumber}.png`;
    dice.src = imageName;
    dice.classList.remove('hidden');

    player1CurrentScore.textContent = String(p1Score);
    player2CurrentScore.textContent = String(p2Score);
  }
});

//action2: Hold
holdBtn.addEventListener('click', function () {
  if (player1Turn) {
    p1TotalScore += p1Score;
    p1Score = 0;
    if (p1TotalScore >= 20) {
      player1.classList.add('player--winner');
      playing = false;
    }
    makeInactive(player1);
    makeActive(player2);
  } else {
    p2TotalScore += p2Score;
    p2Score = 0;
    if (p2TotalScore >= 20) {
      player2.classList.add('player--winner');
      playing = false;
    }
    makeActive(player1);
    makeInactive(player2);
  }
  player1CurrentScore.textContent = String(p1Score);
  player2CurrentScore.textContent = String(p2Score);

  player1TotalScore.textContent = String(p1TotalScore);
  player2TotalScore.textContent = String(p2TotalScore);
  player1Turn = 1 - player1Turn;
});

//action3: New Gameca
newGameBtn.addEventListener('click', init);
