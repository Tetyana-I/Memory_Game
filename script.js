// Part Two - Implementing clicks and matches
// Clicking a card should change the background color to be the color of the class it has.
// Users should only be able to change at most two cards at a time.
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.

// Part Three - Gotchas
// Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
// Make sure that you can not click too quickly and guess more than two cards at a time.

// Further Study
// Add a button that when clicked will start the game
// Add a button that when clicked will restart the game once it has ended
// For every guess made, increment a score variable and display the score while the game is played
// Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
// Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images!
const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const scoreLine = document.getElementById("score");
const bestResultLine = document.getElementById("best-score");

let numOfCardsInput = document.querySelector("#number-of-cards");
let cardArr = []; // an array of game cards
let totalPairMatches; //number of max color-pairs in a game
let clickCounter = 0; // number of clicks
let pairCounter = 0; // number of "founded pairs"
let userScore = 0; // number of user's attempts
let card1;
let card2; // two cards to compare for match
let lessTwoClicks = true; //flag to check excessive clicking
let gameOn = true; //flag to check game is not over
let numOfCards; //number of cards in a current game
let bestUserScore;


function randomColor() {  //return random color
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return `rgb(${r},${g},${b})`;
}

function gameColors(num, arr) { // create an array of pair-colors
  let i=0;
  let nextColor;
  for (let i=0; i<num/2; i++) {
    nextColor = randomColor();
    arr.push(nextColor, nextColor);}
  return arr;
}

function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// function to restart game with colors passed
function createDivsForColors(colorArray) {
  let divId = 0; 
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.setAttribute("data-divId",divId); //attribute with unique ID for each card
    console.log (newDiv);
    divId++; 
    gameContainer.append(newDiv);
    
  }
  gameContainer.addEventListener('click', handleCardClick);
}

function handleCardClick(event) {
  console.log("I'm here!");
  if (event.target.tagName === "DIV" && event.target.id !== "game" && gameOn) {
      clickCounter++;
      if (clickCounter === 1 && lessTwoClicks) {
        card1 = event.target;
        card1.style.backgroundColor = card1.className;
        userScore++;
        scoreLine.innerText = `Current User Score: ${userScore}`; 
          console.log("card1:", card1.getAttribute("data-divId"), card1.className);
        } else if (clickCounter === 2) {
                    card2 = event.target;
                    lessTwoClicks = false;
                    console.log("card2:", card2.getAttribute("data-divId"), card2.className);
                    if(card1.getAttribute("data-divId") === card2.getAttribute("data-divId")) {
                        clickCounter--;
                        lessTwoClicks = true;
                    } else {
                        card2.style.backgroundColor = card2.className;
                        userScore++;
                        scoreLine.innerText = `Current User Score: ${userScore}`; 
                        if (card1.className === card2.className) { // compares colors of two cards 
                                clickCounter = 0;
                                pairCounter++;
                                lessTwoClicks = true;
                                if (pairCounter === totalPairMatches) {
                                    console.log ("GAME OVER!!!", "User Score:", userScore);
                                    scoreLine.innerText = `Current User Score: ${userScore}`; 
                                    gameOn = false;
                                    gameOver();
                                  }
                        } else {
                            setTimeout(function(){
                                card1.style.backgroundColor = "brown";
                                card2.style.backgroundColor = "brown";
                                lessTwoClicks = true;
                                clickCounter = 0;
                            }, 1000);

                        }
                    }
                } 
              }
}

// load the best result
//need to make changes: array of objects in localStorage: number of cards/best result
function loadStorage() {
  if (localStorage.getItem("bestScore")) {
    bestUserScore = localStorage.getItem("bestScore");
    bestResultLine.innerText = "Best User Score: " + localStorage.getItem("bestScore");
} else {
    localStorage.setItem("bestScore",Infinity);
    bestResultLine.innerText = "Best User Score: none";
    }
}

function newGame() {
  loadStorage();
  userScore = 0;
  scoreLine.innerText = `Current User Score: ${userScore}`; 
  pairCounter = 0;
  
  //to clean "old" cards array:
  cardArr = [];
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.lastChild);
  }
  
  gameOn = true;
  numOfCards = numOfCardsInput.value;
  cardArr = gameColors(numOfCards,cardArr);
  totalPairMatches = Math.floor(cardArr.length/2);
  shuffledColors = shuffle(cardArr);
  createDivsForColors(shuffledColors);
 
}

function gameOver() {
   bestUserScore = localStorage.getItem("bestScore");
   console.log("best", localStorage.getItem("bestScore"), "userScore:", userScore);
   if (userScore < bestUserScore) {
      localStorage.setItem('bestScore', userScore);
      bestResultLine.innerText = "Best User Score: " + localStorage.getItem("bestScore");
      // add a game-stopper  + congratulations message for User 
    } else {
      // add a game-stopper message for User
      }
}

startBtn.addEventListener("click", function(e){
  e.preventDefault();
  newGame();}
  ); 









