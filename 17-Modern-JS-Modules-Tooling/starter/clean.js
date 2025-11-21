"use strict";

// const budget = [
//   { value: 250, description: 'Sold old TV 📺', user: 'suraj' },
//   { value: -45, description: 'Groceries 🥑', user: 'suraj' },
//   { value: 3500, description: 'Monthly salary 👩‍💻', user: 'suraj' },
//   { value: 300, description: 'Freelancing 👩‍💻', user: 'suraj' },
//   { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
//   { value: -20, description: 'Candy 🍭', user: 'suraj' },
//   { value: -125, description: 'Toys 🚂', user: 'matilda' },
//   { value: -1800, description: 'New Laptop 💻', user: 'suraj' },
// ];

// const spendingLimits = {
//   suraj: 1500,
//   matilda: 100,
// };

// const getLimit = user =>  spendingLimits?.[user] ?? 0;


// const addExpense = function (value, description, user = "suraj") {
//   // if (!user) user = 'suraj'; // This is just for default value. so we can remove this and assign it like i did above.
//   user = user.toLowerCase();

//   // let lim;
//   // if (spendingLimits[user]) {
//   //   lim = spendingLimits[user];
//   // } else {
//   //   lim = 0;
//   // }

//   // const limit = spendingLimits[user]? spendingLimits[user] : 0;

//   // const limit = getLimit(user) // same meaning as above, but by using "optional chaining" and "nullish coelising".

//   if (value <= getLimit(user)) { // So we took that limit logic in a fucntion and then directly used that in here.
//     // budget.push({ value: -value, description: description, user: user });
//     budget.push({ value: -value, description, user });
//   }
// };
// addExpense(10, 'Pizza 🍕');
// addExpense(100, 'Going to movies 🍿', 'Matilda');
// addExpense(200, 'Stuff', 'Jay');

// const checkExpenses = function () {
//   for (const entry of budget) 
//     // let lim;
//   // if (spendingLimits[entry.user]) {
//     //   lim = spendingLimits[entry.user];
//     // } else {
//       //   lim = 0;
//       // }
      
//       // const limit = spendingLimits?.[entry.user] ?? 0;
      
//       // So we took that limit logic in a fucntion and then directly used that in here.
//       if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
      
      
//     };
//     checkExpenses();
    
//     const logbigExpenses = function (bigLimit) {
//       let output = '';
//       for (const entry of budget) 

//         output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
//         // if (entry.value <= -bigLimit) {
//         //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
//         // }
      
//       output = output.slice(0, -2); // Remove last '/ '
//       console.log(output);
//     };
//     console.log(budget);
//     logbigExpenses(1000);

///////////////////////////////////////////////////////////////

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'suraj' },
  { value: -45, description: 'Groceries 🥑', user: 'suraj' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'suraj' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'suraj' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'suraj' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'suraj' },
]);
// Object.freeze() only workes at the first level, meaning it only applies the "no mutation" thing at the first level only and not on the nested object. So we can do this...
// budget[0].value = 1000;
// But we can only modify the things and cannot add things in it. Like this...
// budget[9] = "suraj"; // Wont work.

const spendingLimits = Object.freeze( {
  suraj: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// console.log(spendingLimits);

const getLimit = (limits, user) =>  limits?.[user] ?? 0;

// So here, A function that manipulates a thing outside that function. So this is a side-effect here and this function is called as a "impure" function.
// const addExpense = function (value, description, user = "suraj") {
//   user = user.toLowerCase();

//   if (value <= getLimit(user)) budget.push({ value: -value, description, user });
// };

// So here we change and improve it.
// Now this function does not produce any side effects.
// Pure function.
const addExpense = function (state, limits, value, description, user = "suraj") {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser) 
  ? [...state, { value: -value, description, user: cleanUser }] 
  : state;

    //  budget.push({ value: -value, description, user: cleanUser });
};

// Composing and currying theory to look on.

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda'); // Here we cant use the "budget" cause its the original unchanged array, so we will pass the result of the previous change which is the "newBudget2". So here it will show the updated new list with previous data still present
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay'); // Same here too, But jay is not allowed to add anything.
// console.log(newBudget1);
// console.log(newBudget2);
// console.log(newBudget3);

// Again this here is a impure function.
// const checkExpenses = function () {
//   for (const entry of budget) 
//       if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
//     };
//     checkExpenses();
    
// Made it a pure function.
    //   const checkExpenses2 = function(state, limits){ 

    //     return state.map(entry => {
    //       return entry.value < -getLimit(limits,entry.user) ? {...entry, flag: "limit"} : entry
    //   });
    // };

    // for (const entry of budget) 
    //   if (entry.value < -getLimit(limits,entry.user)) entry.flag = 'limit';

      // Here we just converted it to the arrow function. And its also a pure function which does not mutates anything.
     const checkExpenses = (state, limits)=> 
      state.map(entry => 
       entry.value < -getLimit(limits,entry.user) 
       ? {...entry, flag: "limit"} 
       : entry
    );
    
    const finalBudget = checkExpenses(newBudget3, spendingLimits);
    console.log(finalBudget);

    const logbigExpenses = function (state,bigLimit) {
      // let output = '';
      // for (const entry of budget)
      //   output += entry.value <= -bigLimit ? `${entry.description.slice
      //   (-2)} / ` : "";

      // output = output.slice(0, -2); // Remove last '/ '
      // console.log(output);

      // Pure version..
      // But this function is also impure cause it does "console.log(bigExpences)", so it does something in the console so its impure, if we remove that then it will be fully pure.
      // But its okay to have some side effects cause because of them only we were able to implement that functionality of that function.
      const bigExpences = state.filter(entry =>entry.value <= -bigLimit)
      .map(entry => entry.description.slice(-2))
      .join(" / ");
      // .reduce((str,cur) => `${str} / ${cur.description.slice(-2)}` ,"")
      console.log(bigExpences);
      
    };
    logbigExpenses(finalBudget,1000); 
 