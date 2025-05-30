'use strict'; // strict mode activated.and will be aplied to all the things down below.
//it helps us to avoid error and bugs.
//it tells us that we have done a error instead of ignoring.
let hasDriversLicense = false;
const passText = true;
//if(passText) hasDriverLicense = true; //Intentional error made.
if(passText) hasDriversLicense = true;
if (hasDriversLicense) console.log("i can drive"); 
//Here we can actually see the use of the strict mode.
//If we dont use the strict mode then the browser wont show any error and we will be clue less.
//Here if we use the strict mode then it will point the error out.
//
// const interface = "audio"; // the strict mode tells us that these are the reserved keywords.
// const private = "number"; // Same here.
// const if = "sdf";
//
//Functions.
function logger(){
 console.log("my name is suraj");   
}
logger(); //invoking,running,calling the function.
logger();
logger();
logger();
logger();
//
function fruitProcessor(apples,oranges){

   // console.log(apples,oranges);
    const juice = `juice with ${apples} apples and ${oranges} oranges`;
    return juice; // by this we can use the variable juice anywhere outside.
    // it returns the value.
}
const appleJuice = fruitProcessor(2,3);// this things inside the braces () is called parameter/arguments of the function.
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2,4);
console.log(appleOrangeJuice);
//function declaration.
function calcAge1(year){ // here in braces its parameter.
    const age = 2025- year;
    return age;
    // or we can write.
    // reutrn 2037- year;
}
const age1 = calcAge1(2005); 
console.log(age1); // here in braces its argument.
//function expression.
const calcAge2 = function (year){
    return 2025- year;
}
const age2 = calcAge2(2000);
console.log(age1,age2);
//
//arrow function.
//syntax () => {};
const calcAge3 = birthYear => 2025 - birthYear;
const age3 = calcAge3(2000);
console.log(age3);
//
const yearsUntilRetire = (birthYear,firstName) => {

    const age = 2025-birthYear;
    const retire = 65 - age;
    // return retire;
    return `${firstName} retires in ${retire}`
}
const finalAge= yearsUntilRetire(2005,"suraj");
console.log(finalAge);
const finalAge2= yearsUntilRetire(2000,"bob");
console.log(finalAge2);

//Function inside a function.
function cutFruitPieces(fruit){ //3. then 2 and 3 are here 
    return fruit * 4; //4. then the number is calculated here.
}
function processor(apples,oranges){ //1. the 2,3 value goes here.
 /*5. then the calculated number comes here */   const applePieces = cutFruitPieces(apples);//2. 2 is here
 /*5. then the calculated number comes here */   const orangePieces = cutFruitPieces(oranges);//2. 3 is here
    const juice1 = `juice with ${applePieces} apples and ${orangePieces
    } oranges` /*6. then it is used and printed here. */
    return juice1;
}
console.log(processor(2,3));
//

const calAge = function (year){
    return 2040 - year;
}
const ret = function (byear,name){

    const age = calAge(byear);
    const retir = 65 - age;
    if(retir>0){
            return `you will retire in ${retir} years ${name}`;

    }else{
        return `${name} has already retired!`;
    }
    // return `${name} retires in ${retir} years`;

}
console.log(ret(2000,"suraj"));
console.log(ret(1970,"ansh"));

//
console.log("")
//

let calcAverage = (s1,s2,s3) => {

    const avg = (s1+s2+s3)/3;
    return avg;
}

//1st test
let scoreDolphins = calcAverage(44,23,71);
let scoreKoalas = calcAverage(65,54,49);
console.log(`dolphins score average ${scoreDolphins}`);
console.log(`koalas score average ${scoreKoalas}`);


function checkWinner (d,k){

    if(d>= 2*k){
        console.log(`dolphin wins (${d} vs ${k})`)
    }else if(k>= 2*d){
            console.log(`koalas wins (${d} vs ${k})`)
        
    }else {
        console.log("no team wins...")
    }
}
checkWinner(scoreDolphins,scoreKoalas);
console.log("")
//2nd test
scoreDolphins = calcAverage(85,54,41);
scoreKoalas = calcAverage(23,34,27);
console.log(`dolphins 2nd score average ${scoreDolphins}`);
console.log(`koalas 2nd score average ${scoreKoalas}`);
checkWinner(scoreDolphins,scoreKoalas)
//

//arrays
const friend1 = "suraj";
const friend2 = "steve";
const friend3 = "bob";

const friends = ["suraj","steve","bob"];
console.log(friends);

const years = new Array(1991,1233,5345,2020);// Another method to define array.

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length-1]);// To always get the last element in an array.

friends[2] = "jay";
console.log(friends);

const suraj = ["suraj","maru", 2025-2005, "student", friends];
console.log(suraj);
console.log(suraj.length);

//

const ccalAge = function(bYear){
    return 2025-bYear;
}
const yearss = [1990,2000,2003,2005,2010,1999]; 

const aaggee = ccalAge(yearss[0]);
const aaggee2 = ccalAge(yearss[1]);
const aaggee3 = ccalAge(yearss[years.length-1]);

console.log(aaggee,aaggee2,aaggee3);
//

const aages = [ccalAge(yearss[0]),ccalAge(yearss[1]),ccalAge(yearss[years.length-1])];
console.log(aages);
//

//array methods.

const f = ["suraj","jay","ansh"];
const newLength = f.push("yash");
console.log(f);
console.log(newLength);
// add in front
f.unshift("john");
console.log(f);
// delete from behind
f.pop()
const popped = f.pop()
console.log(f);
console.log(popped);
//delete from start
const added = f.shift();
console.log(f);
console.log(added);
//
console.log(f.indexOf('jay'));
console.log(f.indexOf('no-one'));
//
f.push(23);
console.log(f.includes("suraj"));
console.log(f.includes("bob"));
console.log(f.includes(23))
console.log(f.includes("23"));
// 23 number is diffrent and "23" string is diffrent.
// it checks exactly and does not perform coercion.
//
if(f.includes("peter")){
console.log("you have a frnd called peter");
} else {
    console.log("you dont have a friend");
}
//

const v1 = [125,555,44];
let tip;
let totaltip;
// let v1 = bills[1];



    function calcTip (v1){
    if(v1<=300 && v1>=50){
        tip = v1*0.15;
        totaltip = v1+tip;
        console.log(totaltip);
    }else if(v1>300){
        tip = v1*0.2;
        totaltip = v1+tip;
        console.log(totaltip);

    }else if(v1<50){
        tip = v1*0.2;
        totaltip = v1+tip;
        console.log(totaltip);



    }
}

const tips = [calcTip(v1[0]),calcTip(v1[1]),calcTip(v1[2])];

//
//objects.
/*
const surajj = {
    firsttName: "suraj",
    lasttName: "maru",
    aaage: 2025-2005,
    jobb: "student",
    friendss: ["jay","bob","tom"]
};
//dot notation and bracket notations.
console.log(surajj);
console.log(surajj.lasttName);//way to access object values.
console.log(surajj["firsttName"]); //way to access object values.
//

const nameKey = "Name";
console.log(surajj["firstt"+ nameKey]); //ways
console.log(surajj["lastt"+ nameKey]); //ways
//
// console.log(suraj."lastt"+ nameKey); //not possible here.
//

const p = prompt("what do you wanna know about suraj? choose between firsttName, lasttName, aaage, jobb, friendss");
if(surajj[p]){
    console.log(surajj[p]); // this is a great example for using dot or bracket notation.
    // console.log(surajj.p);// this wont work for us here.
    
}else{
    console.log("choose one from the provided one!")
}
//
surajj.loaction = "india";
surajj["twitter"] = "@surajmaru";
console.log(surajj);
// here we can make any changes in our created object.
// and is shown by using 2 diffrent methods.
//

console.log(`${surajj.firsttName} has ${surajj.friendss.length} friends, and his best friend is called ${surajj.friendss[2]}`);
//
*/

const surajj = {
    firsttName: "suraj",
    lasttName: "maru",
    birthhYear: 2005,
    jobb: "student",
    friendss: ["jay","bob","tom"],
    hassDriverLicense: true,

    // calccAge: function (birthhYear){ // this is an expression.
    //     return 2025-birthhYear; // function can be used inside a object using a key value like here "calccAge",
    // } // Any function that is attached to an object is called as a method.

    //  calccAge: function (birthhYear){ // this is an function declaration so it wont work here..
    //     return 2025-birthhYear; 
    // }

    // calccAge: function (){
    //     return 2025-this.birthhYear; //Here "this.birthhYear" means the object which is our surajj and then the birthhYear keyword init.
    //     // so the value inside it is accesed.
    //     // we can also write "surajj.birthhYear" instead of "this.birthhYear" but it violates the "dont repeat you code rule"
    //     // and we change our object name from surajj to something else then the code wont work!. so this. is used.
    // }

    calccAge: function (){
        this.aaage = 2025-this.birthhYear; 
        return this.aaage;
    },

    getSummary: function(){
        return `${surajj.firsttName} is a ${surajj.aaage}-year old ${surajj.jobb}, and he has ${ surajj.hassDriverLicense? "a":"no" } driver's license`;
    },

};
// console.log(surajj.calccAge(surajj.birthhYear));
// console.log(surajj["calccAge"](surajj.birthhYear)); // here is the o/p for the function expression above in an object.
console.log(surajj.calccAge()); // first we have to call the function here. Without it, the aaage key is not added in the object. so we have to call/run the function and then use that keyword 
console.log(surajj.aaage);
console.log(surajj.aaage);
console.log(surajj.aaage);
//

console.log(surajj.getSummary());
//
// console.log(typeof yearss)

// challenge
let mark = {

    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function(){
         this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    },
   
};
let john = {

    fullName: "John Smith",
    mass: 92,
    height: 1.95,
     calcBMI: function(){
         this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }

};

mark.calcBMI();
john.calcBMI();
if(mark.bmi>john.bmi){
console.log(`Mark Miller's BMI ${mark.bmi} is higher than John Smith's ${john.bmi}!`);
} else {
    console.log(`John Smith's BMI ${john.bmi} is higher than Mark Miller's ${mark.bmi}!`)
}
//

//loops
// console.log("lifting weights rep 1");
// console.log("lifting weights rep 2");
// console.log("lifting weights rep 3");
// console.log("lifting weights rep 4");
// console.log("lifting weights rep 5");
// console.log("lifting weights rep 6");
// console.log("lifting weights rep 7");
// console.log("lifting weights rep 8");
// console.log("lifting weights rep 9");
// console.log("lifting weights rep 10");

for(let i=1; i<=10; i++){
    console.log(`lifting weights rep ${i}`)
}// alternative for above code.
//

//looping arrays,breaking and continuing.
const surajArray = [
    "suraj","maru",2025-2005,"student",["bob","tom","jacob"], true
];
const types =[];

for(let i=0; i<surajArray.length; i++){
    console.log(surajArray[i],typeof surajArray[i] ); // reading from the array.

    //types[i] = typeof surajArray[i]; // filling an array
    types.push(typeof surajArray[i]); // other method.
}

console.log(types);
//

const yearr = [2000,1990,1999,2005,2010];
const ages = [];

for(let i=0; i<yearr.length;i++){

    ages.push(2025 - yearr[i]);
}
console.log(ages);
//

//continue and break statement.

console.log("---only string---")
for(let i=0; i<surajArray.length; i++){
    if(typeof surajArray[i] !== "string")continue // continue statement example.
    console.log(i,surajArray[i],typeof surajArray[i] ); 
}
console.log("---only numbers---")
for(let i=0; i<surajArray.length; i++){

    if(typeof surajArray[i] !== "number")continue // continue statement example.
    console.log(i,surajArray[i],typeof surajArray[i] ); 
}
//

console.log("---break with number---");
for(let i=0; i<surajArray.length; i++){

    if(typeof surajArray[i] === "number") break // break statement example.
    console.log(i,surajArray[i],typeof surajArray[i] ); 
}
//

// looping backwards and loops in loops.
const surajArrayy = [
    "suraj",
    "maru",
    2025-2005,
    "student",
    ["bob","tom","jacob"]
];

for(let i = surajArrayy.length-1; i>=0 ; i--){ // printing a array in backwards. 
    console.log(i,surajArrayy[i]);
}
//

//loops in loops.
for(let exercise = 1; exercise<=3; exercise++){
    console.log(`-----starting exercise ${exercise}`)

    for(let rep = 1; rep<=5; rep++){
        console.log(`exercise ${exercise} lifting weights reps ${rep}`);
    }
}
//

//while loop.
// for(let rep = 1; rep<=10; rep++){
//     console.log(`reps ${rep}`)
// }

let rep = 1;
while(rep<=10){
    console.log(`while loop reps ${rep}`);
    rep++;
}
console.log("------");
let dice = Math.trunc(Math.random()*6) + 1;
while(dice!==6){
    console.log(`you rolled a ${dice}`);
    dice = Math.trunc(Math.random()*6) + 1;

if(dice===6){
    console.log("loop ended")
}
}
//
//challenge.
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const ttips = [];
const ttotals = [];

 const calcTippp = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

for(let i = 0; i<bills.length; i++){
   
let w = calcTippp(bills[i]);
 ttips.push(w);
ttotals.push(w + bills[i]);
}
console.log(bills, ttips, ttotals);
//

