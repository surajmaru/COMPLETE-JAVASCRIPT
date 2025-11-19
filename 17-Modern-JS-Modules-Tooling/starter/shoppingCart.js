// Exporting modules.
console.log("Exporting module");

// Blocking code.
// console.log("Start fetching users");
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finished fetching");


const shippingCost = 10; // Here we can only use this variables here only cause its "module scoped", We cannot use this in another file.
// And to manually export it we have to manually use the "export" keyword to export a perticular function or etc to another file.
export const cart = [];

// Like here.
// It should be only defined on the top-level code.
export const addToCart = function(product,quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}

// Otherwise it wont work, like this:-
// if(true){
// export const addToCart = function(product,quantity){
//     cart.push({product,quantity});
//     console.log(`${quantity} ${product} added to cart`);
// }}

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice,totalQuantity as tq};

export default function(product,quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
};

// This is not possible here.
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

