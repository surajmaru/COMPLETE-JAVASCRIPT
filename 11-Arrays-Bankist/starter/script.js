'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
console.log("---BANKIST APP---");
// Data
const account1 = {
  owner: 'Suraj Maru',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
  
};

const account2 = {
  owner: 'Tony Stark',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
};

const account3 = {
  owner: 'Yash More',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
};

const account4 = {
  owner: 'Jay Singh',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//////////////////////////////////////
//transaction logic.
const displayMovements = function(movements, sort = false){
containerMovements.innerHTML = " ";
// .textContent = 0;

////////////////////////////////////////////////////
// Changing the logic of the movements array whether to be sorted or not.

// if sort is ture then "movements.slice().sort((a,b)=>a-b)" this will happen and then the sorted array will be stored in the "movs" variable.

//And if "sorted" is false then nothing will happen, the movements array will be stored in the "movs" variable.
const movs = sort ? movements.slice().sort((a,b)=>a-b) : movements;

movs.forEach(function(mov, i){

  const type = mov > 0 ? "deposit" : "withdrawal"

  const html = `
  
  <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>

  `;

  containerMovements.insertAdjacentHTML("afterbegin", html );
})
}
////////////////////////////////////
// balance calculation.
const calcDisplayBalance = function(acc){
  const balance = acc.movements.reduce((acc,curr)=> acc+curr,0);
  acc.balance = balance; // storing the account balance in the object for the later use.
  labelBalance.textContent = `${balance}€`
}

/////////////////////////////////
//username logic.
const createUserNames = function(acc){

  acc.forEach(function(acc){

    acc.username = acc.owner.toLowerCase().split(" ").map(ele=>ele[0]).join("");
    // creating a new peoperty in the account1,2,3,4 objects which will have the new string of the username for the following owner.
  })
}
createUserNames(accounts);
console.log(accounts);
////////////////////////////////////////
//bottom summary logic.
const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov=>mov>0)
  .reduce((acc,curr)=> acc+curr,0);
  labelSumIn.textContent = `${incomes}€ `

  const outcomes = acc.movements
  .filter(mov=> mov<0)
  .reduce((acc,curr)=> acc+curr,0); 
  labelSumOut.textContent = `${Math.abs(outcomes)}€`

  const interest = acc.movements
  .filter(mov=>mov>0)
  .map(mov => mov*acc.interestRate/100)
  .filter((int,i,arr)=>{
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc,curr,i,arr)=>{
    console.log(arr);
   return acc+curr
  },0);
  labelSumInterest.textContent = `${interest}€`;
}

//we sorted those 3 function calls in one function. "clean code practice" 
 const updateUI = function(currentAccount){
  //display movements.
    displayMovements(currentAccount.movements);
    
     //display balance.
    calcDisplayBalance(currentAccount);
    
    //display summary.
    calcDisplaySummary(currentAccount);
 }

//////////////////////////////////////
//login implementation.
let currentAccount;

btnLogin.addEventListener("click",function(e){
  e.preventDefault();// prevent form from submitting.

  currentAccount = accounts.find(acc=> acc.username === inputLoginUsername.value); // beacuse of this line everything is happening.

  if(currentAccount?.pin === Number(inputLoginPin.value) ){ // if the current account exists then only it will go to further operation. 
   
   // display ui and welcome message.
   labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;

   containerApp.style.opacity = 1;

   // clear input fields.
   inputLoginUsername.value = inputLoginPin.value = "";
   inputLoginPin.blur();

    //update the ui.
    updateUI(currentAccount);

    console.log("LOGIN");
  }
  else if(!currentAccount){
    console.log("INCORRECT");
    document.querySelector(".welcome").innerHTML = "Incorrect User";

  }
})
//////////////////////////////////////////
//transfer money logic.
btnTransfer.addEventListener("click",function(e){
  e.preventDefault();

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  console.log(amount,receiverAcc);

  if(receiverAcc &&  amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username ){

    //doing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //update the ui.
    updateUI(currentAccount);

    console.log("transfer valid");
  }

  inputTransferAmount.value = inputTransferTo.value = "";
});


/////////////////////////////////////////////

// close account implementation.

//findIndex is a new es6 method.
// for this idea we want to enter the username and then we will just delete that whole object from the array itself.
// so for deletng the object from the "accounts" array we need the splice method and this method needs the index of which we want to delete so we will use the "findIndex" method for this implementation.

btnClose.addEventListener("click",function(e){
  e.preventDefault();
  
  if( inputCloseUsername && inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    
    const index = accounts.findIndex(acc => acc.username === currentAccount.username); // we are just matching the condition and saving the object's index in the variable "index".
    console.log(index);
    
    
    //Hide UI.
    containerApp.style.opacity = 0;
    
    //Delete account.
    accounts.splice(index,1); // and here we called the index of the object which we want to delete.
    
    
    console.log("DELETE");
  }
  //Clear the input value.
  inputCloseUsername.value = inputClosePin.value = "";
});

////////////////////////////////////////////////
//loan logic.
btnLoan.addEventListener("click", function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  //logic for loan.
  if(amount && amount>0 && currentAccount.movements.some(mov=>mov >= amount * 0.1)){
    // add the money.
    currentAccount.movements.push(amount);
    //update the ui.
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
})

/////////////////////////////////////
//Bottom "sort" button toggle.

let sorted = false;

btnSort.addEventListener("click",function(e){
  e.preventDefault();
  
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  
});

//////////////////////////////////////////
console.log("---BANKIST APP COMPLETE---");

console.log("---Challenge 1---");


// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets


const checkDogs =  function(arr1,arr2){
 const arr11 = arr1.slice(1,-2);
 console.log(arr11);

 const tArr = [...arr11,...arr2]
 console.log(tArr);

 for(const [f,l] of tArr.entries()){
   if(l>0 && l <=3 ){
    console.log(`Dog number ${f + 1} is still a puppy 🐶`);
  }else{
    console.log(`Dog number ${f + 1} is an adult, and is ${l} years old`);
  }
 }
}
checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4]);


console.log("---Challenge 1 complete---");


console.log("---Challenge 2---");

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets


const calcAverageHumanAge = function(age){
  
  const humanAges = age.map(ele=>ele<=2? 2*ele : 16 + ele * 4 );
  const adults = humanAges.filter(age => age>=18 );

  console.log(humanAges);
  console.log(adults);

  const average = adults.reduce((acc,curr)=> acc+curr,0)/adults.length;
  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5
  //const average = adults.reduce((acc,curr,i,arr)=> acc+curr/arr.length,0)
  // console.log(average);
  return average;

}
const a = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const a2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(a,a2);

console.log("---Challenge 2 complete---");

console.log("---Challenge 3---");

// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

//write with arrow function.
const calcAverageHumanAge2 = age =>
  
  age.map(ele=>ele<=2? 2*ele : 16 + ele * 4 )
  .filter(age => age>=18 )
  .reduce((acc,curr,i,arr) => acc+curr/arr.length,0);

  // console.log(humanAges);
  // console.log(adults);

  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5
  //const average = adults.reduce((acc,curr,i,arr)=> acc+curr/arr.length,0)
  // console.log(average);
  
const a3 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const a4 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(a3,a4);

console.log("---Challenge 3 complete---");

console.log("---Challenge 4---");


// This time, Julia and Kate are studying the activity levels of different dog breeds.

// YOUR TASKS:
// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// 3. Create an array "allActivities" of all the activities of all the dog breeds
// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1
const huskyWeight = breeds.find(avg=>avg.breed === "Husky").averageWeight;
console.log(huskyWeight);

// 2 
const dogBothActivities = breeds.find(breed=>
  breed.activities.includes("running") && breed.activities.includes("fetch")).breed;
console.log(dogBothActivities);

// 3
// const allActivities = breeds.map(b=>b.activities).flat();
const allActivities = breeds.flatMap(b=>b.activities);
console.log(allActivities);

// 4
// const uniqueActivities = new Set(allActivities);
// console.log(uniqueActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5
const swimmingAdjacent1 = [...new Set(
  breeds
  .filter(f=>f.activities.includes("swimming"))
  .flatMap(f=>f.activities)
  .filter(f=>f !== "swimming")
)];
console.log(swimmingAdjacent1);

// 6
const avgW = breeds.every(w=>w.averageWeight>10)
console.log(avgW);

// 7
const dogActive = breeds.some(a=>a.activities.length >= 3)
console.log(dogActive);

// bonus
const avgHeavy2 = breeds.filter(h=>h.activities.includes("fetch"));
console.log(avgHeavy2);
const avgHeavy3 = avgHeavy2.map(avg=>avg.averageWeight);
console.log(avgHeavy3);
const avgHeavy = Math.max(...avgHeavy3); // Math.max(avhHeavy3) will now work cause the math.max does not work with an array its works with the numbers. so thats why we spread the array into its elements which are the numbers.
console.log(avgHeavy);

console.log("---Challenge 4 complete---");

console.log("---Challenge 5---");

// Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

// - Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// - Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// - Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

// YOUR TASKS:
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
// 9. Group the dogs by the number of owners they have
// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(dogs => (dogs.recFood = Math.floor(dogs.weight ** 0.75 * 28)));
console.log(dogs);
//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah')); 
console.log(dogSarah); 
//3
console.log(`sarah's dog eats too ${dogSarah.curFood>dogSarah.recFood? "much":"less"}`);
//4
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

  console.log(ownersTooMuch);
  console.log(ownersTooLittle);
//5
  const toMuch = ownersTooMuch.join(" and ");
  const toLittle = ownersTooLittle.join(" and ");
  console.log(`${toMuch}'s dogs eat too much! and ${toLittle}'s dogs eat too little!`);

  console.log(dogs.some(w=>w.curFood === w.recFood));
//6
  const checkEatingOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;
  console.log(dogs.every(checkEatingOkay));
//7
  const dogsEatingOkay = dogs.filter(checkEatingOkay);
  console.log(dogsEatingOkay);
//8
  let grp = Object.groupBy(dogs,dog=>{
    if (dog.curFood > dog.recFood) {
    return 'too-much';
  } else if (dog.curFood < dog.recFood) {
    return 'too-little';
  } else {
    return 'exact';
  }
  })
  console.log(grp);
//9
  let grpAge = Object.groupBy(dogs,dog=>`${dog.owners.length}-owners`);
  console.log(grpAge);
//10
  const dd = dogs.toSorted((a, b) => a.recFood - b.recFood);
  console.log(dd);

console.log("---Challenge 5 complete---");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Concepts

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr =  ["a","b","c","d","e"];

//slice method.
console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

//splice method.
// console.log(arr.splice(2));
console.log(arr);
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1,2);
console.log(arr);

//reverse method.
arr =  ["a","b","c","d","e"];
const arr2 = ["j","i","h","g","f"];
console.log(arr2.reverse());
console.log(arr2);

//concat mrthod.
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);

// join method.
console.log(letters.join("-"));
console.log(letters.slice(0,-1));



//at method.

const arr3 = [23,11,64];
console.log(arr3[0]); // old way
console.log(arr3.at(0)); // new method

// getting the last element.
console.log(arr3[arr3.length - 1]); // old way
console.log(arr3.slice(-1)[0]); // old way
console.log(arr3.at(-1)); // new method.
console.log(arr3.at(-2));

console.log("suraj".at(0));
console.log("suraj".at(-1));

//for Each loop:-

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// this is for of method.

// for (const move of movements){
for(const [i ,value] of movements.entries()){ // here first parameter is the index. and the second parameter is the value.
  if(value > 0 ){
    console.log(`movement ${i+1}: You deposited ${Math.abs(value)}`);
  }else{
    console.log(`movement ${i+1}: You withdrew ${Math.abs(value)}`); //Math.abs() removes the sign.
  }
}
console.log("--------forEach----------");
// forEach method.
// this method recives a function.
movements.forEach(function(move,i,a){ //first parameter: should always be the element. second: should always be the index. third parameter: should always be the array.

  if(move > 0 ){
    console.log(`movement ${i+1}: You deposited ${Math.abs(move)}`);
  }else{
    console.log(`movement ${i+1}: You withdrew ${Math.abs(move)}`); //Math.abs() removes the sign "-".
  }
  console.log(a);
  
});
// 0: fnction(200)
// 1: fnction(450)
// 2: fnction(-400)
// 3: fnction(3000)
// 4: fnction(-650)
// 5: fnction(-130)
// ...

// forEach With Maps and Sets.

//map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map){

  console.log(`${key}: ${value}`);
})

//set
const currenciesUnique = new Set(["usd","GBP","USD","EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value,_,map){
  console.log(`${_}: ${value}`);
})

//

//array map method.
console.log("---array map method---");

const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movements2Usd = movements2.map(function(mov){
 const s = mov*eurToUsd;
 return s;
});

const movements2Usd2 = movements2.map(mov => mov*eurToUsd); 
//with arrow function
//arrow function automatically returns the value.

console.log(movements2Usd);
console.log(movements2Usd2);
console.log(movements2);

//with for of loop.
const move2 = [];
for(const mov of movements2){
  move2.push(mov*eurToUsd)
}
console.log(move2);

// element,index and array in map(). 
const md = movements2.map((move, i ,arr)=>

  //same logic which was written below but better.
  `movement ${i+1}: You ${move > 0 ? "deposited":"withdrew"} ${Math.abs(move)}`

  // previous logic.
  // if(move > 0 ){
  //   return (`movement ${i+1}: You deposited ${Math.abs(move)}`);
  // }else{
  //   return (`movement ${i+1}: You withdrew ${Math.abs(move)}`); //Math.abs() removes the sign "-".
  // }
);
console.log(md);

//array filter method.
console.log("---array filter method---");

const deposits = movements2.filter(function(mov){
  return mov > 0
})
console.log(movements2);
console.log(deposits);
//with the array methods chaining is possible and its very useful.
// this is functional programming too.

// with for of loop.
const depositsFor =[];
for(const mov of movements2){
  if(mov>0){
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

//for withdrawals.
const withdrawals = movements2.filter(m => m<0); // in arrow function we dont write return, its already happening.
console.log(movements2);
console.log(withdrawals);

// with for of loop.
const withdrawalFor =[];
for(const mov of movements2){
  if(mov<0){
    withdrawalFor.push(mov);
  }
}
console.log(withdrawalFor);

//array reduce method.
console.log("---array reduce method---");

console.log(movements2);

// accumulator is like a snowball
const balance = movements2.reduce(function(acc,curr,i,arr){
  console.log(`Iteration ${i}: ${acc}`);
 return acc + curr;
},0)
console.log(balance);

//with an arrow function.
const balance2 = movements2.reduce((acc,curr)=>acc + curr,0);
console.log(balance2);

// same with for of loop.
let balance3 = 0;
for(const mov of movements2){
  balance3+= mov;
}
console.log(balance3);

// Maximun of the movements2.
const max = movements2.reduce((acc,curr)=>{
  if(acc> curr){
    return acc;
  }else{
    return curr
  }
}, movements2[0]);
console.log(max);

// same with ternary opertator.
const max2 = movements2.reduce((acc,curr)=> acc>curr? acc:curr);
console.log(max2);


// chaining methods.
const eurToUse2 = 1.1;
const totalDeposits = movements2
.filter(mov => mov>0)
.map(mov => mov*eurToUse2)
.reduce((acc,curr) => acc+curr, 0);

console.log(totalDeposits);

//the find method.
console.log("---The find method---");

const m =movements2.find(val=>val<0);
console.log(m);

console.log(accounts);

const account = accounts.find((acc)=>{
  return acc.owner === "Suraj Maru"
})
console.log(account);

// by for of way.
for(const a of accounts){
  if(a.owner === "Suraj Maru"){
    console.log(a);
  }
}

//find index method.
console.log("---findIndex method---");


const numbers = [1, 3, 7, 8, 10];

const index = numbers.findIndex(num => num % 2 === 0);

console.log(index); // 3  (because numbers[3] = 8)

//
const users = [
  { id: 1, name: "Suraj" },
  { id: 2, name: "Amit" },
  { id: 3, name: "Priya" }
];

const index2 = users.findIndex(user => user.name === "Amit");

console.log(index2); // 1

//
const numbers2 = [5, 7, 9];

const index3 = numbers.findIndex(num => num > 10);

console.log(index3); // -1 (no match)

//
const arrr = [10, 20, 30];

console.log(arrr.find(x => x > 15));     // 20
console.log(arrr.findIndex(x => x > 15)); // 1


//findlast and findlastindex methods.
console.log("---findLast and findLastIndex methods---");

console.log(movements2);
const lastWith = movements2.findLast(mov=>mov<0);
const lastWith2 = movements2.findLastIndex(mov=>mov<0);

console.log(lastWith);
console.log(lastWith2);

const lastWith3 = movements2.findLastIndex(mov=>mov>2000);
console.log(`Your lastest large movement was ${movements2.length - lastWith3} movements ago`);


//some and every
console.log("---some and every methods---");

//some
console.log(movements2);
// this check only for equality
console.log(movements2.includes(-130));

// this method is great but if we want to check a condition then we have to use the some and every method.

//this checks for condition.
const dep =movements2.some(mov => mov > 3000);
console.log(dep);

console.log(movements2.some(mov => mov === -130 ));// for this we just can use the includes method but for a logical condition we use the "some " method. 

//every.
console.log(movements2.every(mov=>mov>0));
console.log(account4.movements.every(mov=>mov>0));

// common callback as a variable.
const deps = mov=>mov>0;
console.log(movements.some(deps));
console.log(movements.every(deps));
console.log(movements.filter(deps));

//flat and flatMap methods
console.log("---flat and flatMap methods---");

//flat method.
const arr5 = [[1,2,3],[4,5,6,],7,8];
console.log(arr5.flat());
//
const arr5Deep = [[[1,2],3],[4,[5,6]],7,8];
console.log(arr5Deep.flat());
console.log(arr5Deep.flat(0));
console.log(arr5Deep.flat(1));
console.log(arr5Deep.flat(2));
console.log(arr5Deep.flat(3)); // these numbers are the levels of nesting for in the array.
console.log(arr5Deep.flat(Infinity));
//
// const accountMovements = accounts.map(acc=> acc.movements);
// const accountFlat = accountMovements.flat();
// console.log(accountMovements);
// console.log(accountFlat);
// const overallBalance = accountFlat.reduce((acc,curr)=> acc+curr,0);
// console.log(overallBalance);

//shorter version.
const overallBalance = accounts.map(acc=> acc.movements).flat().reduce((acc,curr)=> acc+curr,0);
console.log(overallBalance);

//mapping and flat is a very common pair we use it many times, so this is why flatMap comes in play.

//flatMap method.
const overallBalance2 = accounts.flatMap(acc=> acc.movements).reduce((acc,curr)=> acc+curr,0);
console.log(overallBalance2);


// sort method 
console.log("---Sorting() method---");

//strings.
const owners = ["suraj","jay","bob","yash"];
console.log(owners.sort());
console.log(owners);

//numbers.
console.log(movements2);
console.log(movements2.sort()); // gives wrong here.
//sort treates the numbers as the string and then sort it like 100,20,3000,50,6. like that.

// if we return something < 0 then A will be before B. (keep order)
// and if we return something > 0 then B will be before A. (switch order)
// This is for the ascending order.
movements2.sort((a,b) =>{ // a is the current value and b is the next value.
  if (a>b) return 1; // this means, if the prevous number is greater than the next number then swap them both.
  if (a<b) return -1; // here if the previous number is less then the next number then keep the same dont swap them.
});

//new way.
movements2.sort((a,b)=>  a - b);
// here, if a is greater than b then the result will be a positive number. then it return that positive number. And it swaps them.
//And if the a is less then b then the result will be negative then it will return a negative number so, it doesnt swap them. 
//Because this the condition for the ascending order. 
console.log(`Ascending: ${movements2}`);

//

// This is for the descending order.
// movements2.sort((a,b)=>{
//   if (a>b) return -1;
//   if (a<b) return 1;
// })

// This is the other better way to do the same.
movements2.sort((a,b)=> b - a); 
console.log(`Descending: ${movements2}`);

// IF you have a mixed array of strings and numbers then it will not work.

// Array grouping.
console.log("---Array Grouping---");


const movements3 = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements3);

// in here we do grouping by "Object.groupBy()" and not on the array name directly.
const groupedMovements = Object.groupBy(movements3,movement=> // it takes 2 arguments, 1st is the array itself and 2nd is the callback function which will determine how exactly we want to group the elements in the array.
movement > 0 ? "deposits" : "withdrawals");

console.log(groupedMovements); // Here we get an object as the result.
//op:- 
// {deposits: Array(5), withdrawals: Array(3)}
// deposits: (5) [200, 450, 3000, 70, 1300]
// withdrawals: (3) [-400, -650, -130]

//

const groupedByActivity = Object.groupBy(accounts, account=> {

  const movementCount = account.movements.length;

  if(movementCount>= 8 ) return "very active";
  if(movementCount>= 4 ) return "active";
  if(movementCount>= 1 ) return "moderate";
  return "inactive";
  // so these 4 are the possible groups made depending on the condition.
  // And it will be sorted in one of or more of the above groups depending on the condition.
});
console.log(groupedByActivity);

//op:-
// {very active: Array(3), active: Array(1)}

// active: Array(1)
// 0: {owner: 'Jay Singh', movements: Array(5), interestRate: 1, pin: 4444, username: 'js'}
// length: 1
// [[Prototype]]: Array(0)

// very active: Array(3)
// 0: {owner: 'Suraj Maru', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'sm'}
// 1: {owner: 'Tony Stark', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'ts'}
// 2: {owner: 'Yash More', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'ym'}
// length: 3
// [[Prototype]]: Array(0)

//

// grouping the objects by a common key or something.

const groupedAccounts = Object.groupBy(accounts, account=> account.type);

const groupedAccounts2 = Object.groupBy(accounts, ({type})=> type); // by Destructuring method.

console.log(groupedAccounts);
console.log(groupedAccounts2);
//op:- {premium: Array(2), standard: Array(1), basic: Array(1)}


// Creating and Filling Arrays.
console.log("---Creating and Filling Arrays---");

const aar = [1,2,3,4,5,6,7,8,9];
console.log(new Array(1,2,3,4,5,6,7,8,9));

//Empty arrays + fill method.
const x = new Array(7);
console.log(x); // this contains empty array of size 7.

console.log(x.map(()=>5)); // This doesnt work.

console.log(x.fill(1)); // this method works with the constructed empty erray of length 7.

const y = new Array(8);
y.fill(1,3) // "1" is the element and "3" is the starting index.
console.log(y);

const z = new Array(8);
z.fill(1,3,5); // this starts filling "1" from 3rd index till the index before the end parameter which is "5-1 = 4".
console.log(z);

aar.fill(23,2,6);
console.log(aar);

// Array.from
const xx = Array.from({length:7}, ()=> 1)
console.log(xx); // (7) [1, 1, 1, 1, 1, 1, 1]

const yy = Array.from({length: 7}, (_, i)=> i + 1); // here "_" in the parameter is the throwaway parameter. like if we dont want anything in that position of parameter then we use the "_".
console.log(yy); // (7) [1, 2, 3, 4, 5, 6, 7]

const zz = Array.from({length:100},(_,i)=> i = Math.round(Math.random()*10))
console.log(zz); // 100 random dice rolls.


// get access with the elements on the UI.

// labelBalance.addEventListener("click",function(){
//   const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
//   console.log(movementsUI.map(ele => Number(ele.textContent.replace("€",""))));
  
// });

labelBalance.addEventListener("click",function(){
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
     ele => Number(ele.textContent.replace("€","")));

  console.log(movementsUI);
  // we created an array from the result of this "document.querySelectorAll(".movements__value")" It gives back a NodeList (looks like an array, but not a real array) which is not really an array but a array like structure and this structure can easily be converted to an array using "Array.from" and then as a second step we included a mapping function which transforms the initial array into an array as exactly we wanted like this "ele => Number(ele.textContent.replace("€",""))", converting the raw element with its text content and replacing the euro symbol with nothing. 

  // then we get the array of numbers on the UI after clicking on the label on which we called the eventlistener.
  //op:- (8) [1300, 70, -130, -650, 3000, -400, 450, 200]

    // Another way of converting to an array. but then we have to map() separately.
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
  movementsUI2.map(ele => Number(ele.textContent.replace("€","")));
  // Like this, so the "Array.from" is the best way to go.
});

//Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with
console.log("---Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with---");

// reverse, splice, sort mutate the original array.
// so here these methods dont mutate the array instead they return the original array.

//toReverse() method.
console.log(movements3);
// const reversed = movements3.slice().reverse(); // previously we used to use this type of chaining to not change the original array.
const reversed = movements3.toReversed(); // but here is the direct alternative.
console.log(reversed);
console.log(movements3);

console.log(movements3);

//toSorted() method, toSpliced() method.
// console.log(movements3.splice(1,6));
console.log(movements3.slice().splice(1,6));
console.log(movements3.toSpliced(1,5));
console.log(movements3);

// console.log(movements3.sort());
console.log(movements3.slice().sort());
console.log(movements3.toSorted());
console.log(movements3);

// with() method.
// movements3[1] = 2000;
const newMovement = movements3.with(1,2000);
console.log(newMovement);
console.log(movements3);


//
let aa = 10;
console.log(++aa);

const depo = accounts.flatMap(acc=> acc.movements)
.reduce((acc,curr)=> (curr>= 1000? ++acc: acc),0)
console.log(depo);

//
const {deposits2,withdrawals2} =  accounts
.flatMap(acc=> acc.movements)
.reduce((acc,curr)=> {
  // curr > 0 ? (acc.deposits2 += curr) : (acc.withdrawals2 += curr);
  acc[curr > 0 ? "deposits2" : "withdrawals2"] += curr;
  return acc;
},{deposits2:0,withdrawals2:0});
console.log(deposits2,withdrawals2);

//
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//