const cards = document.querySelectorAll('.card');

//On first flipped card if match with second flipped card it will lock both cards
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

//If cards match it will freeze those cards and it will prevent them from flipping back - managed with dataset html atribute
function checkForMatch() {
  let isMatch = firstCard.dataset.legend === secondCard.dataset.legend;

  isMatch ? disableCards() : unflipCards();
}

//Matched card will be disabled for clicks once they are flipped
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//If cards don't match it will flip the cards back in 0.5s and you will have a new attempt to make
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);

  // Add Move
  addMove();
}

//Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    rating();
}

//Star Rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 12) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 18) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


//Timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + ' s';

 function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

startTimer()

function stopTimer() {
    clearInterval(liveTimer);
}


//Congrats not working PLEASE HELP
function endGame(){
    // stop timer
    clearTimeout(timer);
    // show prompt
    let stars = $(".stars").length;
    vex.dialog.confirm({
        message: `Congrats! You won the game in ${timeCount} seconds with ${stars}/3 star rating. Do you want to play again?`,
        callback: function(value){
            if (value){
                resetGame();
            }
        }
    });
}


//Game Reset
function myButton() {
  location.reload();
}

//If second card match with first card it will return from the function
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

//Use to shuffle cards - 8 front and 8 back side = 16
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });

})();

cards.forEach(card => card.addEventListener('click', flipCard));
