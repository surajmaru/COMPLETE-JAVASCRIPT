'use strict';
/*
Javascript is a high level, prototype-based object oriented, multi-paradigm,
interpreted or just-in-time compiled, dynamic, single threaded, garbage collected programming language with first class
function and a non-blocking event loop concurrency model.
*/
//scoping.
function calcAge(birthYear) {
    const age = 2025- birthYear;
    //console.log(firstName);
    function printAge(){
        let output = `${firstName} you are ${age} years old, born in ${birthYear}`;
        console.log(output);
    
        if(birthYear>= 1981 && birthYear<=1996){
            //var millenial = "true";
            const str = `oh, and your a millenial, ${firstName}`;
            console.log(str);
        }else{
            var millenial = true;
            const firstName = "barbie"
            output = "new output";
            //const output = "new output"
            const str = `oh, and your a Gen-z, ${firstName}`;
            console.log(str);
            function add(a,b){
                return a + b;
            }
            //console.log( add(2,3));

        }
        // console.log(str);
    console.log(millenial);
    // let and const are block scoped.
    // var is function scoped.
    //console.log( add(2,3)); //this will work only when the strict mode is off, otherwise it will work.
    console.log(output);
}
    printAge()
    return age;
}

const firstName = "suraj";
calcAge(2005);
// console.log(age);
// printAge();

//BREAK
//hoisting with variables.
console.log(me);
// console.log(job);
// console.log(year);

var me = "suraj";
let job = "student";
const year = 2005;

//functions.
console.log(addDecl(2,3));
// console.log(addExpr(2,3));
// console.log(addArrow(2,3));

function addDecl(a,b){
    return a + b;
}

var addExpr = function(a,b){
    return a+b;
}

const addArrow = (a,b) => a + b;


// example.

if(!numProducts) deleteShoppingCart(); // because here numProducs is undefined because of the var.

var numProducts = 10;

function deleteShoppingCart(){
    console.log("all product deleted");
}

var x =1;
let y =34;
const z = 32;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//BREAK

//this keyword.

console.log(this);
//
const calcAage = function (birthYear){
    console.log(2025-birthYear);
    console.log(this);
}

calcAage(2005);

//
const calcAage2 =  (birthYear)=>{
    console.log(2025-birthYear);
    console.log(this);
}

calcAage2(20055);

//
const suraj = {
    year: 2005,
    calcAge2: function(){
        console.log(this);
        console.log(2025 - this.year);
    }
}
suraj.calcAge2();

//
const jay = {
    year: 2017,
    
};
jay.calcAge2 = suraj.calcAge2;//This is called method borrowing.
jay.calcAge2();

const f = suraj.calcAge2;
console.log(f);

//BREAK

//var firstName6 = "bro"

const suraj2 = {
    firstName6 : "suraj",
    year: 2005,
    calcAge2: function(){
        console.log(this);
        console.log(2025 - this.year);
//sol 1
        // const self = this;
// 
        // const isMillenial = function(){
            // console.log(self);
            // console.log(self.year >= 1981 && self.year <= 1996);
            console.log(this.year >= 1981 && this.year <= 1996);
// 
        // };

//sol 2
        const isMillenial = ()=>{
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
            //console.log(this.year >= 1981 && this.year <= 1996);

        };
        isMillenial();
    },
    // greet: ()=> {
    //     console.log(this);
    //     console.log(`hey ${this.firstName6}`)},//this doesnt work in the arrow function.
    greet: function () {
        console.log(this);
        console.log(`hey ${this.firstName6}`)},

};
suraj2.greet();
// console.log(this.firstName);
suraj2.calcAge2();

// arguments keyword
const addExpr1 = function (a,b){
    console.log(arguments);
    return a+b;
};
addExpr1(2,3);
addExpr1(2,4,5,2,234)
var addArrow1 = (a,b) => {
    
    console.log(arguments);
    return a+b};

    // addArrow1(2,3,4);

    //BREAK

    const maru = {
        firstName: "yo",
        lastName: " maru",
        age: 20,

    };


    function marryPerson(originalPerson,newLastName){
        originalPerson.lastName = newLastName;
        return originalPerson;
    }

    const maru2 = marryPerson(maru, "suraj")
    // const maru2 = maru;
    // maru2.lastMaru = "davis";

    console.log("before",maru);
    console.log("after",maru2);

    //
    const maru3 = {
        firstName: "yo",
        lastName: " maru",
        age: 20,
        family: ["alice","bob"]

    };

    //shallow copy
    const surajCopy = {...maru3};//All the properties of the maru3 object to the new object as it is.
    surajCopy.lastName = "sdfsdf";

    // console.log(maru3,surajCopy);//Uncomment this to understand.
    // surajCopy.family.push("marry");
    // surajCopy.family.push("jay");

    // console.log("before",maru3);
    // console.log("after",surajCopy);
    //Here both the objects got the same.

    //deep copy
    const surajClone = structuredClone(maru3);
    surajClone.family.push("marry");
    surajClone.family.push("jay");

    console.log("before clone",maru3);
    console.log("after clone",surajClone);
    //But here the original one remains the same and the new one is only modified accordingly.

    //BREAK

    