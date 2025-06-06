'use strict';

/*
console.log( document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "correct number :)";
console.log( document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 23;
document.querySelector(".score").textContent = 53;

document.querySelector(".guess").value = 24;
console.log( document.querySelector(".guess").value);

*/
//BREAK

let secretNumber = Math.trunc(Math.random()*10)+1; //This generates a random number between 1 and 20.
let score = 0;
//document.querySelector(".number").textContent = secretNumber;
document.querySelector(".score").textContent = `0/3`;
document.querySelector(".check").addEventListener("click",()=>{

    const guess = Number(document.querySelector(".guess").value);

//When there is no input.
if(!guess){
document.querySelector(".message").textContent = "No Number!"
}

//When both are same.
else if(guess === secretNumber && score < 3){
document.querySelector(".message").textContent = "correct number :)";
document.querySelector(".number").textContent = secretNumber;
score ++;
document.querySelector(".score").textContent = `${score}/3`;
//When player wins.
if(score === 3){
document.querySelector(".message").textContent = `You WON! got Score ${score}`;
//document.querySelector(".score").textContent = 0;
document.querySelector("body").style.backgroundColor = "#60b347";
document.querySelector(".number").style.width = "30rem";
}
secretNumber = Math.trunc(Math.random()*10)+1;
setTimeout(()=>{document.querySelector(".number").textContent = "?"}, 2000)
//setTimeout(()=>{document.querySelector(".guess").value = ""},1000);

}

//When guess is too high.
else if(guess> secretNumber){
document.querySelector(".message").textContent = "Too High!";
if(score>0){
score --;
document.querySelector(".score").textContent = `${score}/3`;
}
}

//When guess is too low.
else if(guess< secretNumber){
document.querySelector(".message").textContent = "Too Low!";
if(score>0){
score --;
document.querySelector(".score").textContent = `${score}/3`;
}
}
//secretNumber = Math.trunc(Math.random()*10)+1;
//document.querySelector(".number").textContent = secretNumber;//To chech whats the random value for coders.
});

document.querySelector(".again").addEventListener("click",()=>{
document.querySelector(".score").textContent = 0;
score = 0; 
document.querySelector(".message").textContent = "Start guessing...";
document.querySelector("body").style.backgroundColor = "#222";
document.querySelector(".number").style.width = "15rem";
document.querySelector(".number").textContent = "?";
document.querySelector(".guess").value = "";
secretNumber = Math.trunc(Math.random()*10)+1;

});