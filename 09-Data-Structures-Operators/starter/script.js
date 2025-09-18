'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


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

console.log("---SETS---");

const ordersSet = new Set(["pasta","pizza","pizza","burger","pasta","burger"]);
console.log(ordersSet);

console.log(new Set("suraj"));
console.log(new Set());

console.log(ordersSet.size);
console.log(ordersSet.has("pizza"));
console.log(ordersSet.has("bread"));

ordersSet.add("frankie");
ordersSet.add("frankie");
ordersSet.delete("burger");
// ordersSet.clear();
console.log(ordersSet);

for(const order of ordersSet){
  console.log(order);
};

//example 
const staff = ["waiter","chef", "waiter","manager","chef", "waiter"];
// const staffUnique = new Set(staff);
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);

console.log(new Set("suraj").size);

//New Operations to Make Sets Useful
console.log("---New Operations to Make Sets Useful---");

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

//1. intersection method
const commonF = italianFoods.intersection(mexicanFoods);
console.log("intersection:", commonF);
console.log("intersection:",[...commonF]);

//2. union method
const imMix = italianFoods.union(mexicanFoods);
console.log("union:",imMix );

console.log("Completer together:" , [...italianFoods,...mexicanFoods]);
console.log("set converted:" , new Set([...italianFoods,...mexicanFoods]));
console.log("array converted:" , [...new Set([...italianFoods,...mexicanFoods])]);

//3. difference method
const diff = italianFoods.difference(mexicanFoods);
const diff2 = mexicanFoods.difference(italianFoods);
console.log(diff);
console.log(diff2);

//4. symmetricDifference method
const syDiff = italianFoods.symmetricDifference(mexicanFoods);
console.log(syDiff);

//5. isSubsetOf method

const newSet = new Set([1,2]);
const newSet2 = new Set([1,2,3,4,5,6]);
const subset1 = newSet.isSubsetOf(newSet2);
console.log(subset1);

const subset = italianFoods.isSubsetOf(mexicanFoods);
console.log(subset);

const subset2 = mexicanFoods.isSubsetOf(italianFoods);
console.log(subset2);

//6. isSupersetOf method
const superset = newSet2.isSupersetOf(newSet);
console.log(superset);

//7. isDisjointFrom method
const newset4 = new Set([1,2,3]);
const newset5 = new Set([4,5,6]);
const desset = newset4.isDisjointFrom(newset5);
console.log(desset);

//

//Maps.
console.log("---Maps---");

const rest = new Map();
rest.set("name", "classical");
rest.set(1,"france");
rest.set(2,"portugal");
console.log(rest);

rest.set("catagories", ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set("open", 11).set("close", 23).set(true,"we are open").set(false,"we are closed");

rest.get('name')

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
const timeDaily = rest.get(time > rest.get("open") && time < rest.get("close"));
console.log(timeDaily);

console.log(rest.has("catagories"));
rest.delete(2);

console.log(rest);
console.log(rest.size);

// rest.clear();
// console.log(rest);
const arrr = [1,2];
rest.set(arrr, "test")
// rest.set([1,2], "test"); // this wont work here thats why we use the other method.
// console.log(rest.get([1,2]));
console.log(rest.get(arrr)); 

rest.set(document.querySelector("h1"), "heading");
console.log(rest);

//Maps iteration.
console.log("---Maps iteration---");

const question = new Map([
  ["question", "whats the best programming language in the world?"],
  [1, "c"],
  [2,"java"],
  [3,"javaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "incorrect"]
]);
console.log(question);

//convert obj ot map.
console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours));
console.log(hourMap);

console.log("---Quizz game---");
//quizz
console.log(question.get("question"));
for(const [key,value] of question){
  if(typeof key === "number"){
    console.log(`Answer ${key}: ${value}`);
  }
};
// const answer = Number(prompt("your answer"));
// console.log(answer);
// console.log(question.get(question.get("correct") === answer));
// console.log(question.get(answer === 3)); //another way of doing the same.
console.log("---Game over---");

//convert map to array.
console.log([...question]);
//
console.log(question.entries());
console.log(question.keys());
console.log(question.values());
//
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
//

console.log("---Challenge 3---");

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const newArr5 = [...new Set(gameEvents.values())];
gameEvents.delete(64);

console.log(newArr5);

console.log(`An event happened on average every ${90/ gameEvents.size} minutes.`);

const arr7 = [...gameEvents.keys()].pop();
// console.log(arr7);
console.log(`An event happened, on average, every ${arr7 / gameEvents.size} minutes`);

for(const [minute,event] of gameEvents){
  const half = minute <= 45 ? "FIRST" : "SECOND"
    console.log(`[${half} HALF] ${minute}: ${event}`);
  }

  console.log("---Challenge complete---");
  //

  //working with strings
  console.log("---Working with strings---");

  const airline = "Indian airliner";
  const plane = "A320";

  console.log(plane[0]);
  console.log(plane[1]);
  console.log(plane[2]);
  console.log("B737"[0]);

  console.log(airline.length);
  console.log("B737".length);

  console.log(airline.indexOf("r"));
  console.log(airline.lastIndexOf("r"));
  console.log(airline.indexOf("Indian"));

  console.log(airline.slice(4));
  console.log(airline.slice(4,8));

  console.log(airline.slice(0, airline.indexOf(" ")));
  console.log(airline.slice(airline.lastIndexOf(" ")+1));  
  console.log(airline.slice(airline.lastIndexOf("a")));

  console.log(airline.slice(-2));
  console.log(airline.slice(1, -2));

  const checkMS = function(seat){
    // B and E are middle seats.
    const s = seat.slice(-1);
    if(s === "B" || s === "E")
      console.log("you got the middle seat");
    else
      console.log("you got lucky");
    
  }
  checkMS("11B");
  checkMS("23C");
  checkMS("3E");

  console.log(new String("hello"));
  console.log(typeof new String("hello"));
  console.log(new String("hello").toUpperCase());
  console.log(typeof new String("hello").slice(1));

  //

  console.log(airline.toLowerCase());
  console.log(airline.toUpperCase());
  
  //Fix capitalization in name.
  const passenger = "SUraj"; //Suraj.
  const passengerLower = passenger.toLowerCase();
  const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);

  const correctName = function(name){
  const passengerLower = name.toLowerCase();
  const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);
  };
  correctName("JAck"); 

  //comparing email.
  const email = "hello@gmail.com";
  const loginEmail = "  Hello@gmaIL.Com \n";
  const lowerEmail = loginEmail.toLowerCase();
  const trimmedEmail = lowerEmail.trim();
  console.log(trimmedEmail);

  const  normalEmail = loginEmail.toLowerCase().trim();//easy way.
  console.log(normalEmail);
  console.log(email === normalEmail);

  // replacing.
  const priceGB = "288,97£";
  const priceUS = priceGB.replace("£", "$").replace(",",".");
  console.log(priceUS);

  const announcement = "all passenger come to boarding door 23. Boarding door 23!";
  console.log(announcement.replace("door","gate"));  //this will only change the first occurence of that word not to all of them.
  console.log(announcement.replaceAll("door","gate")); //this will change to all.

  console.log(announcement.replace(/door/g,"gate")); //without the replace method. "g" here stands for global.
  
  //Booleans.
  const plane2 = "Airbus A320neo";
  console.log(plane2.includes("A320"));
  console.log(plane2.includes("boeing"));
  console.log(plane2.startsWith("A")); //case sensitive.
  console.log(plane2.startsWith("Airn"));

  if(plane2.startsWith("Airbus") && plane2.endsWith("neo")){
    console.log("Part of the new airbus family");
  }else{
    console.log("Not a part of the airbus family");
  }

  //practice exercise.
  const checkBaggage = function(items){
    // const baggage = items;
    const baggage = items.toLowerCase();
    if(baggage.includes("gun") || baggage.includes("knife"))
      console.log("You are not allowed on board!");
    else console.log("Welcome aboard!");
  }
  checkBaggage("I have a laptop, some Food and a pocket Knife");
  checkBaggage("Socks and camera");
  checkBaggage("Got some snacks and a gun for protection");

  //

  console.log("a+very+nice+string".split("+"));
  console.log("Suraj maru".split(" "));

  const [firstName, lastName] = "Suraj maru".split(" ");
  console.log(firstName);
  console.log(lastName);

  const newName = ["Mr.",firstName, lastName.toUpperCase()].join(" ");
  console.log(newName);

  //practice example.
  const capName = function(name){
    const names = name.split(" ");
    const namesUpper = [];

    for(const n of names){
      // namesUpper.push(n[0].toUpperCase() + n.slice(1));
      namesUpper.push(n.replace(n[0], n[0].toUpperCase())); //easy alternative.
    }
    console.log(namesUpper.join(" "));
  }
  capName("suraj and bob davis");
  capName("suraj maru");

  //padding a string.
  const message2 = "Go to gate 23";
  console.log(message2.padStart(25,"+").padEnd(35,"+")); //The overall size of the string till the last "3" will be 25 and it will add 10 "+" to the end of the string, and not the overall length of the string is 35.
  console.log("suraj".padStart(20,"+").padEnd(30,"+"));

  //practice example.
  const maskCreaditCard = function(number){
    const str = number + "";
    const last = str.slice(-4);
    return last.padStart(str.length, "*");
  };
  console.log(maskCreaditCard(2342542525)); 
  console.log(maskCreaditCard("34534534534"));

  //repeat method.
  const mess2 = "Bad weather...All departures Delayed... ";
  console.log(mess2.repeat(5));

  //practice example.
  const planesInLine = function(n){
    console.log(`There are ${n} planes in the line ${"✈️".repeat(n)}`);
  };
  planesInLine(5);
  planesInLine(3);
  planesInLine(12);
  
  //

  
  