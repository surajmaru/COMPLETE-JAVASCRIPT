'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);


const weekD = ["mon","tue","wed","thu","fri","sat","sun"];
const openingHour = {
    [weekD[0]]: {
      open: 12,
      close: 22,
    },
    [weekD[1]]: {
      open: 11,
      close: 23,
    },
    [weekD[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // openingHours,
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // order: function(starterIndex,mainIndex){ //old technique.
  order(starterIndex,mainIndex){ // new another way.
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({starterIndex,mainIndex=1,time="22:00 PM",address}){
    console.log(`order recieved: ${starterIndex} and ${this.mainMenu[mainIndex]} will be delivered at your ${address} at ${time}`);
    
  },

  orderPasta: function (ing1,ing2,ing3){
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function(mainIng, ...otherIng){
    console.log(mainIng,otherIng);
  }
};



// BREAK
// const ing = [prompt("lets make pasta! ingredient 1?"), prompt("lets make pasta! ingredient 2?"), prompt("lets make pasta! ingredient 3?")];
// console.log(ing);
// restaurant.orderPasta(ing[0],ing[1],ing[2]);//old method. 
// restaurant.orderPasta(...ing);// using spread operator.
// BREAK
restaurant.orderDelivery({
  time: "22:30 PM",
  address: "home",
  mainIndex:2,
  starterIndex:3,
});

restaurant.orderDelivery({
  starterIndex:1,
  address: "home",
});
//destructuring objects.

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);
//changing the variable name.
const {name:restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName,hours,tags);
//default values.
const {menu = [], starterMenu: starters = ["samosa"]  } = restaurant;
console.log(menu,starters); //theres values inside the startermenu array so it will use them and if theres not any values then it will use the default value.
//mutating variables.
let aa = 111;
let bb = 343;
const obj = {aa:23, bb: 54, cc:45 };
({aa,bb} = obj);// we have to wrap the destructuring assignment into the parentheses to work.
console.log(aa,bb);
//nested objects.
const {sat:{open:o,close:cc}} = openingHours;// here because we have destructured the resturant object above, so here we dont need to write the "restaurent.openingHours" we can just write "openingHours" like here.
console.log(o,cc);


//Destructuring an array.

const arr = [2,3,4];
const a = arr[0];
const b = arr[1];
const c = arr[2];


const [x,y,z] = arr; // here we destructured it.

console.log(x,y,z);
console.log(arr);


//
let [main, ,secondary] = restaurant.categories;// without the comma the first is first and the second is second, 
// but after using the 2 comman between them the first is the same but the second becomes the third.
// we just skip the element in the middle.
console.log(main, secondary);

//swapping variables .
//normal method of reassigning the values.

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main,secondary);

// destructuring method.
[main,secondary] = [secondary, main];
console.log(main,secondary);

//
// receive 2 return values from a function.
const [starter, mainCourse] = restaurant.order(2,0);
console.log(starter, mainCourse);

//

//array inside array.
const nested = [2,3, [5,6]];
// const [one, , two ] = nested;
// console.log(one,two);
//nested destructuring.
const [i, , [j,k] ] =  nested;
console.log(i,j,k);

//
//default values.
const [p=1,q=1,r=1] = [8, 9];
console.log(p,q,r);


// the (...)spread operator.

const arr3 = [1,2,3];
const newArr = [...arr3,4,5,6];
console.log(newArr);

console.log(newArr);
console.log(...newArr);// see the difference between these two!!

const newMenu = [...restaurant.mainMenu,"milk","banana"];
console.log(newMenu);//the original array stays the same, we are completely creating a new array.


//shallow copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//join 2 or more arrrays.
const menuCopy = [...restaurant.mainMenu , ...restaurant.starterMenu];
console.log(menuCopy);


const str = "suraj";
const letters = [...str, "", "a","b","c"];
console.log(letters); // here we unpacked a string.
console.log(...str);
// console.log("s","u","r","a","j"); //this is what we did but in short cut.
// console.log(`${...str} maru`); // Not allowed like this.

//spread operator on objects.
const newRes = {...restaurant, founder: "suraj", foundedIn: 2000};
console.log(newRes);

//copy of the object
const restaurantCopy2 = {...restaurant};
restaurantCopy2.name = "my place";
console.log(restaurant.name);
console.log(restaurantCopy2.name);

//

// rest pattern and parameter.
const arr54 = [1,2,...[4,5,6]]; //spread operator, used on right side.

const arr45 = [1,2,3,4,5];
const [v,n, ...others] = arr45; // rest operator, used on left side.
console.log(v,n,others);
//destructuring assignment.
const [pizza, ,Risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza,Risotto,otherFood);

//in objects destructuring assignment.
const {sat, ...weekDays} = restaurant.openingHours;
console.log(sat,weekDays);

//in functions.
const add = function(...numbers){// rest parameter. //packed.
  let sum = 0;
  for (let i=0; i < numbers.length; i++){
    sum += numbers[i];
  }
console.log(sum);
}
add(2,3);
add(5,3,7,2);
add(2,5,6,3,7,3);

const xx  =[23,5,7];
add(...xx); //spread the above array in here as argument. //unpacked.

restaurant.orderPizza("mushroom", "onion", "potato", "tomato");
//
//BREAK

// logical operators can use any datatypes, return any datatype, short-circuiting.
console.log("---OR---");
console.log(3 || "suraj"); //first is already truthy → stops there.
console.log("" || "suraj"); // "suraj" because "" is falsy, so prints truthy. stops there
console.log(true || 0); //"true" prints truthy value. stops there
console.log(undefined || null); // both falsy → returns last.

console.log(undefined || 0 || "" || "hello" || 23 || null); // "hello" is the first truthy value here so prints it and stops.

restaurant.numGuests = 23;
const guests1 =  restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

console.log("---AND---");
console.log(0 && "suraj"); //short-circuits → stops at first falsy
console.log(7 && "suraj"); //both are truthy → returns last value
console.log("hello" && 23 && null && "suraj"); //finds faulsy, whole becomes false and returns the faulsy value.

if (restaurant.orderPizza){
  restaurant.orderPizza("mushroom","butter");
};

restaurant.orderPizza && restaurant.orderPizza("mushroom","butter");

//the nullish coalescing operator (??)
//?? checks only for null or undefined (not 0, not "", not false).
restaurant.numGuests = 0; 
const guest3 = restaurant.numGuests || 10; //|| checks for any falsy value (false, 0, "", null, undefined, NaN).
const guest4 = restaurant.numGuests ?? 10; //?? checks only for null or undefined (not 0, not "", not false).
console.log(guest3);
console.log(guest4);

//new Logical Assignment Operators introduced in es2021.

const res1 = {
  name: "suraj",
  // numG: 20,
  numG: 0,
};

const res2 = {
  name: "bob",
  owner: "bobby",
};
console.log("---OR Assignment Operator---");
// res1.numG = res1.numG || 10; //old method/operator
// res2.numG = res1.numG || 10;

// res1.numG ||= 10;// new operator.
// res2.numG ||= 10;
console.log("---Nullish Assignment Operator---");//null or undefined.
res1.numG ??= 10;//here this operator works. numG: 0, (for this condition).
res2.numG ??= 10;

console.log(res1);
console.log(res2);

const rep = res2.numG = res1.numG || 10;
console.log(rep);

console.log("---AND Assignment Operator---");
// res2.owner = res2.owner && "<ANONYMOUS>";
res1.owner &&= "<ANONYMOUS>";
res2.owner &&= "<ANONYMOUS>";
console.log(res2);
console.log(res1);
//
console.log("---CHALLENGE---");
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [player1,player2] = game.players;
const [gk, ...fieldPlayers] = player1;
const allPlayers = [...player1,...player2];
const playerFinal = [...player1,'Thiago', 'Coutinho', 'Perisic'];
const {team1,x: draw,team2 } = game.odds;


function printGoals(...pl){
  console.log(`${pl.length} goals were scored`);
  // for(const player of pl){
  //   console.log(player);
  // }
  console.log(...pl);
}

printGoals( 'Davies', 'Muller', 'Lewandowski','Kimmich');
printGoals(...game.scored);

team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
console.log("---CHALLENGE COMPLETE--");
//

//The for-of Loop
console.log("---The for-of Loop---");

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) console.log(item);

// for(const item of menu2.entries()) console.log(`${item[0]+1}: ${item[1]}`, item); // old way.

for(const [i,el] of menu2.entries()) console.log(`${i+1}: ${el}`, [i,el]); // better way.

//Enhanced Object Literals
console.log("---Enhanced Object Literals---");
//go above

//Optional Chaining (?.)
console.log("---Optional Chaining (?.)---");

//old method.
if(restaurant.openingHours.mon){
console.log(restaurant.openingHours.mon.open);
};

// console.log(restaurant.openingHours.mon.open);

// with optional chaining.
console.log(restaurant.openingHours.mon?.open); // "if monday exists then go to "open" and console.log it, and if not then then just return undefined".
console.log(restaurant.openingHours?.fri?.open);

// if(restaurant.openingHours.fri){
// console.log(restaurant.openingHours.fri.open);
// }

const days = ["mon","tue","wed","thu","fri","sat","sun"];
for (const day of days){
  // console.log(day);
  // const open =restaurant.openingHours[day]?.open || "closed"; //this was not suitable for "sat" in the object so we used the nullish operator.
  const open =restaurant.openingHours[day]?.open ?? "closed"; // here it will go to closed if open doesnot exist in some days then "restaurant.openingHours[day]?.open" will become FALSE then the OR operator will go to the opther condition on the right side and it will use that instead of this "restaurant.openingHours[day]?.open". 
  console.log(`on ${day}, we open at ${open}`);
} //this is a good example to understand the optional chaining.

//Methods. 
console.log(restaurant.order?.(0,1) ?? "method does not exists");
console.log(restaurant.menu?.(0,1) ?? "method does not exists");

//arrays.
const users = [
  {
    name:"suraj",
    email:"hello@gmail.com",
  }
];
console.log(users[0]?.name ?? "user arrray empty");

//
// Looping Objects: Object Keys, Values, and Entries
console.log("--- Looping Objects: Object Keys, Values, and Entries---");

//Property name/key.
const props = Object.keys(openingHours);
console.log(props);
console.log(`we are open on ${props.length} days`);

for (const day of props){
  console.log(day);
}

let strL = `we are open on ${props.length} days`;
for (const day of props){
  strL+= ` ${day},`;
}
console.log(strL);

//Property values.
const values = Object.values(openingHours);
console.log(values);

for(const day of values){
  console.log(day);
}

//Property entries.
const value2 = Object.entries(openingHours);
console.log(value2);

for(const [key, {open, close}] of value2){ //destructuring here.
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}
//

console.log("---challenge 2---");

const game3 = Object.entries(game.scored);

for(const [index,player] of game3){
  console.log(`${player} has ${Number(index)+1} goals`);
};

let oddd = 0;
const odds = Object.values(game.odds);
for(const odd of odds){
  oddd += odd;
}

oddd /= odds.length
console.log(oddd);

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

const scores = {};

for(const player of game.scored){
  scores[player] = scores[player] ? scores[player] + 1 : 1;
  console.log(scores);
}
console.log(scores);
console.log("---challenge complete---");
//

