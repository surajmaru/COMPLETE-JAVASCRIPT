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
  
};

const account2 = {
  owner: 'Bob Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Yash Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jay Patil',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

//transaction logic.
const displayMovements = function(movements){
containerMovements.innerHTML = " ";
// .textContent = 0;

movements.forEach(function(mov, i){

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
displayMovements(account1.movements);

// balance calculation.
const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,curr)=> acc+curr,0);

  labelBalance.textContent = `${balance}€`
}
calcDisplayBalance(account1.movements);


//username logic.
const createUserNames = function(acc){

  acc.forEach(function(acc){

    acc.username = acc.owner.toLowerCase().split(" ").map(ele=>ele[0]).join("");
    // creating a new peoperty in the account1,2,3,4 objects which will have the new string of the username for the following owner.
  })
}
createUserNames(accounts);
console.log(accounts);

//bottom summary logic.
const calcDisplaySummary = function(movements){
  const incomes = movements
  .filter(mov=>mov>0)
  .reduce((acc,curr)=> acc+curr,0);
  labelSumIn.textContent = `${incomes}€ `

  const outcomes = movements
  .filter(mov=> mov<0)
  .reduce((acc,curr)=> acc+curr);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`

  const interest = movements
  .filter(mov=>mov>0)
  .map(mov => mov*1.2/100)
  .filter((int,i,arr)=>{
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc,curr,i,arr)=>{
    console.log(arr);
   return acc+curr
  },0);
  labelSumInterest.textContent = `${interest}`;
}
calcDisplaySummary(account1.movements);

//////////////////////////////////////////
console.log("---BANKIST APP COMPLETE---");

console.log("---Challenge 1---");


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