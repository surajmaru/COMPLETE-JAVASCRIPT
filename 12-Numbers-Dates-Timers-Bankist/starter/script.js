'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

console.log("---BANKIST APP---");
// Data
const account1 = {
  owner: 'Suraj Maru',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
  movementsDates: [
    '2024-06-18T21:31:17.178Z',
    '2024-08-23T07:42:02.383Z',
    '2025-08-28T09:15:04.904Z',
    '2025-09-26T10:17:24.185Z',
    '2025-09-28T14:11:59.604Z',
    '2025-10-01T17:01:17.194Z',
    '2025-10-02T14:36:17.929Z',
    '2025-10-02T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN', // de-DE
  
};

const account2 = {
  owner: 'Tony Stark',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-25T18:49:59.371Z',
    '2025-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};



const accounts = [account1, account2];

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


// A complete function for the date logic. To keep it clean.
// And the logic for the today,yesterday and so on logic.
const formatMovementDate = function(date,locale){
  
  const daysPassed = (date1,date2) => 
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 *24));

  const daysPassed2 = daysPassed(new Date(), date);
  console.log(daysPassed2);

  if(daysPassed2 === 0) return `Today`;
  if(daysPassed2 === 1) return `Yesterday`
  if(daysPassed2 <= 7) return `${daysPassed2} days ago`;
  
  return new Intl.DateTimeFormat(locale).format(date)

    // const day = `${date.getDate()}`.padStart(2,"0")
    // const month = `${date.getMonth() + 1}`.padStart(2,"0");
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
  }; 

  // A simple function which will take any value andy locale and any currency. To just make our code look better.
  const formatCurr = function(value, locale, currency){
  
      return new Intl.NumberFormat(locale,{
        style: "currency",
        currency: currency,
      }).format(value);
      
  };

//////////////////////////////////////
//transaction logic.
const displayMovements = function(acc, sort = false){
containerMovements.innerHTML = " ";
// .textContent = 0;


// const combinedMovementaDates = acc.movements.map((mov,i)=> {
//   return {werwer}
// })

// Updated sorting method.
const combinedMovementaDates = acc.movements.map((mov,i) => 
  ({movement: mov,
     movementDate: acc.movementsDates.at(i),
  }));

  console.log(combinedMovementaDates);
  //op
  // 0:{movement: 200, movementDate: '2019-11-18T21:31:17.178Z'}
  // 1:{movement: 450, movementDate: '2019-12-23T07:42:02.383Z'}
  // 2:{movement: -400, movementDate: '2020-01-28T09:15:04.904Z'}
  // 3:{movement: 3000, movementDate: '2020-04-01T10:17:24.185Z'}
  // 4:{movement: -650, movementDate: '2020-05-08T14:11:59.604Z'}
  // 5:{movement: -130, movementDate: '2020-07-26T17:01:17.194Z'}
  // 6:{movement: 70, movementDate: '2020-07-28T23:36:17.929Z'}
  // 7:{movement: 1300, movementDate: '2020-08-01T10:51:36.790Z'}


////////////////////////////////////////////////////
// Changing the logic of the movements array whether to be sorted or not.

// if sort is ture then "movements.slice().sort((a,b)=>a-b)" this will happen and then the sorted array will be stored in the "movs" variable.

//And if "sorted" is false then nothing will happen, the movements array will be stored in the "movs" variable.

if(sort) combinedMovementaDates.sort((a,b)=> a.movement - b.movement); // Updated sorting method.

// const movs = sort ? acc.movements.slice().sort((a,b)=>a-b) : acc.movements;

combinedMovementaDates.forEach(function(obj, i){
  const {movement, movementDate} = obj;

  const type = movement > 0 ? "deposit" : "withdrawal";

  ///////////////////////////////////////////////////
  // Date logic in the html.
  const date = new Date(movementDate);
  const displayDate = formatMovementDate(date, acc.locale)
  // Date logic in the html.
  ///////////////////////////////////////////////////
  
  // Formatting the movwmwnt amount according to the country according to the user.
  const formattedMov = formatCurr(movement,acc.locale,acc.currency)


  // new Intl.NumberFormat(acc.locale,{
  //   style: "currency",
  //   currency: acc.currency,
  // }).format(movement);
  /////////////////////////////////////////

  const html = `
  
  <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
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
  labelBalance.textContent = formatCurr(balance,acc.locale,acc.currency);
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
  labelSumIn.textContent = formatCurr(incomes,acc.locale,acc.currency);

  const outcomes = acc.movements
  .filter(mov=> mov<0)
  .reduce((acc,curr)=> acc+curr,0); 
  labelSumOut.textContent = formatCurr(Math.abs(outcomes),acc.locale,acc.currency);

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
  labelSumInterest.textContent = formatCurr(interest,acc.locale,acc.currency);
}

//////////////////////////////////////
//we sorted those 3 function calls in one function. "clean code practice" 
 const updateUI = function(currentAccount){
  //display movements.
    displayMovements(currentAccount);
    
     //display balance.
    calcDisplayBalance(currentAccount);
    
    //display summary.
    calcDisplaySummary(currentAccount);
 }

 ///////////////////////////////////////////
 // Logout timer implementation.
 const startLogoutTimer = function(){

  const tick = function(){
    
    const min = String(Math.trunc(time / 60)).padStart(2,0);
    const sec = String(time % 60).padStart(2,0);

    // in each callback call it will print the remaining time to the UI.
    labelTimer.textContent = `${min}:${sec}`;

    
    // when time is 0 seconds, stop timer and logout the user.
    
    if(time === 0){
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    };

    // decrease one second.
    time--;
  
  };

   // Set the time to 5 minutes.
   let time  = 300;
   // call the timer every second.
   tick();
   const timer = setInterval(tick,1000);
   return timer; // to use the clearInterval we have to return the timer function.
  };

//////////////////////////////////////
//login implementation.
let currentAccount, timer; // we need the "timer" to exist between logins thats why its out in the global scope.

btnLogin.addEventListener("click",function(e){
  e.preventDefault();// prevent form from submitting.

  currentAccount = accounts.find(acc=> acc.username === inputLoginUsername.value); // beacuse of this line everything is happening.

  if(currentAccount?.pin === +inputLoginPin.value){ // if the current account exists then only it will go to further operation. 
   
   // display ui and welcome message.
   labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;

   containerApp.style.opacity = 1;

   ///////////////////////////////////////////
    // Date Logic under Current balance label.
   
    // internationalization date API.
    const nowDate = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"

    };

    const locale = currentAccount.locale; 
    // const locale = navigator.language;// automatic date and time select depending on the region which is on your browser.
    console.log(locale);
    // namespace for the internationalization API.
    // labelDate.textContent = new Intl.DateTimeFormat(locale,options).format(nowDate); // here we replace the manual "en-IN" to the automatic "locale".

    labelDate.textContent = new Intl.DateTimeFormat(locale,options).format(nowDate);

    // Manual way. Above is the automatic way.
    // const day = `${nowDate.getDate()}`.padStart(2,"0")
    // const month = `${nowDate.getMonth() + 1}`.padStart(2,"0");
    // const year = nowDate.getFullYear();
    // const hours = `${nowDate.getHours()}`.padStart(2,"0");
    // const minutes = `${nowDate.getMinutes()}`.padStart(2,"0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;


   // clear input fields.
   inputLoginUsername.value = inputLoginPin.value = "";
   inputLoginPin.blur();


    // Timer clear for another account login logic.
    if(timer) clearInterval(timer);

    //Logout function call.
    timer = startLogoutTimer(); //If we login in a ccount then the timer variable exists and then the above line will be executed when logging into another account.

    //update the ui.
    updateUI(currentAccount);

    console.log("LOGIN");
  }
  else if(!currentAccount){
    console.log("INCORRECT");
    document.querySelector(".welcome").innerHTML = "Incorrect User";

  }
});

//////////////////////////////////////////
//transfer money logic.
btnTransfer.addEventListener("click",function(e){
  e.preventDefault();

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = +inputTransferAmount.value;

  console.log(amount,receiverAcc);

  if(receiverAcc &&  amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username ){

    //doing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date.
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Timer clear/refresh when transfer money.
    clearInterval(timer);

    //Logout function call.
    timer = startLogoutTimer();

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
  
  if( inputCloseUsername && inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin){
    
    const index = accounts.findIndex(acc => acc.username === currentAccount.username); // we are just matching the condition and saving the object's index in the variable "index".
    console.log(index);
    
    
    //Hide UI.
    containerApp.style.opacity = 0;
    setTimeout(function(){labelWelcome.textContent = "Account closed, Login with diffrent user"},800);
    
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
  const amount = Math.floor(inputLoanAmount.value);

  //logic for loan.
  if(amount && amount>0 && currentAccount.movements.some(mov=>mov >= amount * 0.1)){
    // setTimeout logic for a delay when asked for loan.
    // add the money.
   setTimeout(function() {currentAccount.movements.push(amount);

    // Add loan date.
    currentAccount.movementsDates.push(new Date().toISOString());


    // Timer clear/refresh when pressed for loan.
    clearInterval(timer); 

    //Logout function call.
    timer = startLogoutTimer();

    //update the ui.
    updateUI(currentAccount);
  },3000)
  }

  inputLoanAmount.value = "";
})

/////////////////////////////////////
//Bottom "sort" button toggle.

let sorted = false;

btnSort.addEventListener("click",function(e){
  e.preventDefault();
  
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  
});

//////////////////////////////////
// Fake always logged in.
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;


//////////////////////////////////////////
console.log("---BANKIST APP COMPLETE---");

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//Converting and Checking Numbers
console.log("---Converting and Checking Numbers---");

console.log(23 === 23.0);

// Base 10 = 0 - 9. 1/10 = 0.1. 3/10 = 3.3333333333.....
// Base binary = 2 - 0 1
console.log(0.1 + 0.2); //0.300000000000000004
console.log(0.1+0.2 === 0.3); // This is a error in js which we have to accept.

//str to numbers
console.log(Number("23"));
console.log(+"23");

// parsing
console.log(Number.parseInt("30px",10)); // base 10.
console.log(Number.parseInt("30px",2)); // base binary.
console.log(Number.parseInt("p30px",10)); // to make this work the string inside should start with a number only.

console.log(Number.parseInt("23.43rem"));
console.log(Number.parseFloat("23.43rem")); // Its a global function.
// this is best if the number is coming from the css and we want to extract just the number.
console.log(parseFloat("23.43rem")); // this is traditional and old school way of parsing.

console.log(Number.parseFloat("23.43rem")); // Its more good to call this on the number object. Cause the number provides a "namespace" like parseFloat and parseInt.

// check if the value is not a number "NaN"
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20x"));
console.log(+"20x");
console.log(Number.isNaN(23 / 0));
console.log(23/0);
console.log(-(12/0));

// best way to check if the value is a number.
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20x"));
console.log(Number.isFinite(23/0)); // Infinity is not finite so therefore "false".

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23/0));

//Math and Rounding
console.log("---Math and Rounding---");

// Math also has its namespace like shown below.

console.log(Math.sqrt(25));
console.log(25 ** (1/2)); // same as above.
console.log(8 ** (1/3)); // Cubic root.

console.log(Math.max(5,6,34,4,3));
console.log(Math.max(5,6,"34",4,3)); // This does type coercion.
console.log(Math.max(5,6,"34px",4,3)); // but this wont work.

console.log(Math.min(5,6,34,4,3));

console.log(Math.PI * Number.parseFloat("10px") ** 2 );

console.log(Math.trunc(Math.random() * 10)+1); // we will get values between 1 and 10.

// Function to get a random number between two values.
const randomInt = (min,max)=> Math.floor(Math.random() * (max-min + 1)) + min;
console.log( randomInt(10,20));
console.log(randomInt(0,3)); 

// Rounding integers.
console.log(Math.round(23.3)); // round to the closest and nearest int.
console.log(Math.round(23.9));

console.log(Math.ceil(23.3)); // rounded up
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); // rounded down
console.log(Math.floor("23.9")); // it also does type coercion

console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// rounding decimals.
console.log((2.6).toFixed(0)); // this will always return a string and not a number.
console.log((2.6).toFixed(3)); // 3 decimal numbers.
console.log((2.6234).toFixed(2));
console.log(+(2.623).toFixed(2)); // converted string to number.

//The Remainder Operator
console.log("---The Remainder Operator---");

console.log(5 / 2);
console.log(5 % 2); // remainder of 5 divided by 2 is 1.
console.log(8%3);
console.log(8/3);

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEvenn = n => n % 2 === 0;
console.log(isEvenn(2));
console.log(isEvenn(3));
console.log(isEvenn(4));

// if we want to use something for the Nth time then we canuse the remainder operator.

// labelBalance.addEventListener("click",function(){
// [...document.querySelectorAll(".movements__row")].forEach(function(row,i){
//     if( i % 2 === 0 ) row.style.backgroundColor = "orange";
//     if( i % 3 === 0 ) row.style.backgroundColor = "blue";
    
// });
// });

//Numeric Separators
console.log("---Numeric Separators---");

// numeric separators make the numbers easy to see and read for us while not changing the actual value. "_"

// in english we would have used and done like this 287,446,000,000
// we can do the same thing in js but a little diffrently.

const diameter = 2_87_24_520; // like this 
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500; // perspective changed.
console.log(transferFee1);

//rules for the separator.
// const PI = 3._1415;
// const PI = _3.1415;
// const PI = 3.1415_;
// console.log(PI);

// converting a string with the separator to a number will not work.
console.log(Number("230000"));
console.log(Number("230_000"));
console.log(parseInt("230_000"));

//BigInt
console.log("---BigInt---");

console.log(2 ** 53 - 1); // 9007199254740991 // this is the biggest number javascript can easily work with .

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 // here we can confirm that.

// any number bigger than that cannot be represented accurately by the js.

console.log(2 ** 53 + 0);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4879823749872983479827349872);
console.log(4879823749872983479827349872n); // this "n" here is the big int. it transforms the regular interger into a bigInt number.

console.log(BigInt(487982374)); // this function should  be used only with the smalll numbers and not with extremely big numbers as it will give wrong conversion.

// operations.
console.log(10000n + 10000n);
console.log(2398746237864926349826394872398479837987n * 837298472983n);

const huge = 234672893472397498237n;
const regular = 23;
// console.log(huge * regular); // we cant mix regular num with bigint num
console.log(huge * BigInt(regular)); // so here this function becomes necessary.

console.log(20n > 15);
console.log(20n === 20); // this does not do type coercion. "strice one"
console.log(20n == 20); // this does type coercion. "loose one"
console.log(typeof 20n);

console.log(huge + " is really big");

// console.log(Math.sqrt(16n));

console.log(10n / 3n); // here it will simply return the closest bigint. 
console.log(10 / 3);

//Creating Dates
console.log("---Creating Dates---");

// Create a date 

const now = new Date();
console.log(now);

console.log(new Date("Oct 02 2025 17:47:10"));
console.log(new Date("December 24, 2015"));

console.log(new Date(account1.movementsDates[0]));


//year,month,day,hour,minute,second,milisecond.
// months works like this 0 - 11 (jan - dec).
console.log(new Date(2077, 10,19,15,23,5,6));

console.log(new Date(2077, 10,32)); // js auto fixes here. (month day). 

console.log(new Date(0)); // milliseconds from the unix time till now. 0 Milliseconds since Jan 1, 1970 (Unix Epoch)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after the unix time. 3 * 24 * 60 * 60 * 1000 = timestanp on the day number 3.

console.log("");

// working with dates.
const future = new Date(2077, 10,19,15,23);
console.log(future);
console.log(future.getFullYear());
// console.log(future.getYear()); // dont do this.
console.log(future.getMonth()); // its 0 based.
console.log(future.getDate());
console.log(future.getDay()); // 5 = friday.
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //2077-11-19T09:53:00.000Z

console.log(future.getTime()); // Time has passed since the since Jan 1, 1970 (Unix Epoch) " in milliseconds ".

console.log(new Date(3404541180000)); //Fri Nov 19 2077 15:23:00 GMT+0530 (India Standard Time). time passes from the Jan 1, 1970 till Fri Nov 19 2077 in milliseconds.

console.log(Date.now());

future.setFullYear(2047);
console.log(future);

// Operations With Dates.
// Calculating differences between two dates.
const future2 = new Date(2077, 10,19,15,23);
console.log(+future2);
const daysPassed = (date1,date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 *24));
const days1 = daysPassed(new Date(2077, 3,4),new Date(2077, 3,14,10,8))
console.log(days1);

//Internationalizing Numbers (Intl).
const num = 3242344.23;

const options ={
  style: "unit", // style: "percent", style: "currency",
  unit: "mile-per-hour",
    // unit: "celsius",
    // unit: "kilometer-per-hour",
    // currency: "EUR",
    // currency: "INR",
    // useGrouping: false,
     
}

console.log("india: ",new Intl.NumberFormat("en-IN",options).format(num));
console.log("USA: ",new Intl.NumberFormat("en-US",options).format(num));
console.log("germany: ",new Intl.NumberFormat("de-DE",options).format(num));
console.log("serya: ",new Intl.NumberFormat("ar-SY",options).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language,options).format(num));

//Timers: setTimeout and setInterval
console.log("---Timers: setTimeout and setInterval---");


// setTimeout.
setTimeout((ing1,ing2)=>{
  console.log(`Here is your pizza with ${ing1} and ${ing2}!`);
},3000, "olives","tomato");


const ingre = ["onion","corn"]
const pizzaTimer = setTimeout((ing1,ing2)=>{
  console.log(`Here is your pizza with ${ing1} and ${ing2}!`);
},5000, ...ingre); // passing array as the argument using the spread operator.

// async behaviour.
console.log("waiting...");

if(ingre.includes("onion")) clearTimeout(pizzaTimer); // To cancel the timeout before ot has been executed.

//setInterval.
setInterval(function(){
  const now = new Date();
  const hr = now.getHours();
  const min = `${now.getMinutes()}`.padStart(2,"0");
  const sec = `${now.getSeconds()}`.padStart(2,"0");
  // console.log(`${hr}/${min}/${sec}`);
  // labelTimer.textContent = `${hr}/${min}/${sec}`;
  // const n = new Intl.DateTimeFormat("en-IN").format(now);
  // console.log(n);
},1000);
