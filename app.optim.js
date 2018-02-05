/*

Функционал игры
- Игрок должен загадать число между минимальным и максимальным значениями
- Игрок имеет ограниченое количество попыток
- Оповещать игрока сколько поыток осталось
- Оповещать игрока о том угадал он или нет
- Дать возможность тгроку начать сначала

*/

// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Element

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
  window.location.reload();
  }
});
// Listen for guess

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //Validate
  if (isNaN(guess) || guess < min || guess > max ) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct YOU WIN !`);
  } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
      gameOver(false, `You LOST, winning number was ${winningNum}`);
    } else {
        guessInput.value = '';
        guessInput.style.borderColor = 'red';
      setMessage(`${guess} is not correct ${guessesLeft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message
  setMessage(msg, color);
  //Play Again ?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}


// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//Get winning number function
function getRandomNum(min, max) {
 return Math.floor(Math.random()*(max-min+1)+min);
}