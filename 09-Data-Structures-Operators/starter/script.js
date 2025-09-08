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

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

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

  order: function(starterIndex,mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({starterIndex,mainIndex=1,time="22:00 PM",address}){
    console.log(`order recieved: ${starterIndex} and ${this.mainMenu[mainIndex]} will be delivered at your ${address} at ${time}`);
    
  },

  orderPasta: function (ing1,ing2,ing3){
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
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

