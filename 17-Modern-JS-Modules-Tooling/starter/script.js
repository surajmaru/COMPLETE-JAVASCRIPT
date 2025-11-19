// Importing modules
console.log("---Exporting and Importing in ES6 Modules---");
// Importing Named exports.
// import {addToCart, totalPrice as price,tq} from "./shoppingCart.js";
// addToCart("bread", 10);
// console.log(price);
// console.log(tq);

// console.log("Importing module");
// The imported things(from the exported file) will be executed first before the importing script.
// So for ex:- In here the imported function or anything from the exported file will be first executed then the script which is importing the function will be executed.
// All the importing statements are hoisted to the top.
// console.log(shippingCost);

// Importing all as in a object.
// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice);
// console.log(ShoppingCart.tq);

//Import Default exports.
// import add from "./shoppingCart.js"
// add("bananas", 8);

//Importing Mix default and named exports. *AVOID DOING THIS*
// import apple, {addToCart, totalPrice as price,tq} from "./shoppingCart.js";
// apple("apple",10);
// console.log(price);
// console.log(tq);

// Example of live connection between import and export files.
import add, {cart} from "./shoppingCart.js";
add("pizza" ,2);
add("bread" ,20);
add("apple" ,5);

console.log(cart);

// Top-Level await (ES2022)
console.log("---Top-Level await (ES2022)---");

// This is possible cause this is a module file.
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// But this blocks the execution of the entire module now!
// Only after this fetch thing is done then only it will go to bottom and to the rest of the code, so its not asynchronous anymore here in the module.

// Otherwise we had to do this in our normal file to do the asynchronous task.
// async function x() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     console.log(data);
// }
// x();

// EX:-
// const getLastPost = async function(){
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     // console.log(data);
//     return {title: data.at(-1).title, text: data.at(-1).body}
// };
// const lastPost = getLastPost();
// console.log(lastPost);
// So here its a promise and not the actual value so we will convert it useing .then or await.

// not clean
// lastPost.then(last => console.log(last));

// With top-level await
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// The Module Pattern
console.log("---The Module Pattern---");

// const ShoppingCart2 = (function(){
//     const cart = [];
//     const shoppingCost = 10;
//     const totalPrice = 234;
//     const totalQuantity = 40;
//      const addToCart = function(product,quantity){
//         cart.push({product,quantity});
//         console.log(`${quantity} ${product} added to cart`);
//     };

//      const orderStock = function(product,quantity){
//         cart.push({product,quantity});
//         console.log(`${quantity} ${product} ordered from supplier`);
//     };
//     return {
//         addToCart,
//         cart,
//         // shoppingCost,
//         totalPrice,
//         totalQuantity
//     }
// })();
// console.log(typeof ShoppingCart2);
// ShoppingCart2.addToCart("apple",5);
// ShoppingCart2.addToCart("pizza",3);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shoppingCost);

//CommonJS Modules
console.log("---CommonJS Modules---");
// // Export
// exports.addToCart = function(product,quantity){
//     cart.push({product,quantity});
//     console.log(`${quantity} ${product} added to cart`);
// };

// // Import
// const {addToCart} = require("./shoppingCart.js");

// Introduction to NPM
console.log("---Introduction to NPM---");


// npm -v
// go in the project directory
// npm init
// npm i leaflet

// including "Lodash" lbrary
// npm i lodash-es
// Lodash is a popular JavaScript utility library that provides a large set of helpful functions to make working with arrays, objects, strings, numbers, and more much easier.

// import cloneDeep  from "./node_modules/lodash-es/cloneDeep.js";
import { cloneDeep } from "lodash-es";

const state = {
    cart: [
        {product: "bread", quantity: 5},
        {product: "pizza", quantity: 3}
    ],
    user: {loggedIn:true},
}
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// So now the thing is that in our project we usually include lots of librarys and packages so the "node-module" folder has like 10s of thousands of of files and folders in it. 
// so its just not optial to share the code and my whole project cause it will take time to load and transfer the whole node-modules.
// So what we can do is that we can simply delete the "node-module" folder and in the new pc or whenever we need the libraries and packages back, we can just type "npm i" after this all the used packages and all libraries will come back and will be downloaded.
// This is only because of the "package.json" which was created firstime and has all the info about our used libraries and packages.
// So even if the "node-modules" folder is deleted ,because of the "package.json" we can again install them just doing "npm i".

// Bundling With Parcel and NPM Scripts
console.log("---Bundling With Parcel and NPM Scripts---");

if(module.hot){
    module.hot.accept();
}
// npm i parcel --save-dev
// npm i -g

// in the "package.json".
// So we can use..
// npm run dev
// npm run build

// Configuring Babel and Polyfilling
console.log("---Configuring Babel and Polyfilling---");

