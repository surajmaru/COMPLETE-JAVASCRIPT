'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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