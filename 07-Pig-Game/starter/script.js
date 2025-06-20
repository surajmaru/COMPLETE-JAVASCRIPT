'use strict';

//selecting elements.
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");//just other method.
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0"); 
const current1EL = document.getElementById("current--1"); 
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

//starting condition
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; // to stop the game after over

const switchPlayer = ()=>{
     document.getElementById(`current--${activePlayer}`).textContent = 0; 
        activePlayer = activePlayer === 0? 1 :0;
        currentScore = 0;
        player0EL.classList.toggle("player--active");
        player1EL.classList.toggle("player--active");
}

//rolling dice function
btnRoll.addEventListener("click", ()=>{
    if(playing){// to stop the game after over
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display the dice.
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // 3. Check if the rolled number is 1 
    if(dice !== 1){
        // Add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0EL.textContent = currentScore; // This is for understanding will be cahnged later
    }else{ //if true switch to the next player.
        // document.getElementById(`current--${activePlayer}`).textContent = 0; 
        // activePlayer = activePlayer === 0? 1 :0;
        // currentScore = 0;
        // player0EL.classList.toggle("player--active");
        // player1EL.classList.toggle("player--active");
        //What will this do is that if the section has that "player--active" class then it will
        //remove it and if it doesnt have that class then it will add it to the section.
        //So basically its toggling between 0 and 1. 
        switchPlayer();
    }}
});

btnHold.addEventListener("click", ()=>{
    if(playing){// to stop the game after over
    // 1. Add current score to the score of the active player.
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if score is 100.
    if(scores[activePlayer] >= 50){
            //Finish the game.
            playing = false;// to stop the game after over.
                diceEL.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        
    }else{
        //Switch to the other player.
        switchPlayer();

    }}

});

btnNew.addEventListener("click", ()=>{
    scores = [0,0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    player0EL.classList.remove("player--winner");
    player1EL.classList.remove("player--winner");
    player0EL.classList.add("player--active");
    player1EL.classList.remove("player--active");

});