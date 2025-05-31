let gffg = 34;

let js = "amazing";
// if (js === "amazing") alert("js is fun !");
console.log(40+8+23-20)
//
console.log("jonas");
console.log(23);
//
let firstName = "jay";
console.log(firstName);
console.log(firstName);
console.log(firstName);
//
//let 3years = 3; (not allowed).
//let jay&me = "wow brother" (not allowed).
//let suraj_maru = "SM"; (allowed).
//let $suraj = "SM"; (allowed).
//let Person = "suraj"; (allowed, but bad practice).
let myFirstJob = "programmer";
let myCurrentJob = "teacher"; //good approach.
//
let job1 = "programmer";
let job2 = "teacher"; //bad approach.
//
console.log(true);
console.log(false);
let jsIsFun = true;
console.log(jsIsFun);
//
console.log(typeof jsIsFun)
console.log(typeof "true")
console.log(typeof 23)
//
jsIsFun = "YES!";
console.log(jsIsFun);
console.log(typeof jsIsFun);
//
let year;
console.log(year);
console.log(typeof year);
year = 1990;
console.log(typeof year);
//
console.log(typeof null);
//
let age = 30;
age = 40;
console.log(age);
//
const DOB = 1990;
// DOB = 1999; //not possible.
//
// const job; //not possible.
var sdf = "asd";
console.log(sdf); //not optimal, dont use it.
//
myName = "suraj";
console.log(myName); //not optimal.
//
const now = 2234;
const myAge = now-233;
const yourAge = now-432;
console.log(myAge, yourAge);
//
console.log(myAge * 2, yourAge / 2, 2 ** 3) // 2 ** 3 this means 3 in the power of 2 which is 8.
//
const name1 = "suraj";
const name2 = "maru";
console.log(name1+ " " + name2);
//
let x = 10 + 5; //15
x += 10; // x = x + 10;
x *= 4; // x = x * 4;
x++; // x = x + 1;
x--; // x = x - 1;
console.log(x);
//
const finalAge = myAge > yourAge; 
console.log(finalAge); // >, <, >=, <=
//
console.log(now - 2000 > now - 1000);
//
let a ,b;
a = b = 10 + 12 + 34;
console.log(a,b);
//
const averageAge = (myAge + yourAge) / 2;
console.log(myAge, yourAge, myAge + yourAge, averageAge);
//
const nameMy = "suraj";
const job = "student";
const birth = 2005;
const future = 2025; 
const suraj = "I'm " + nameMy + ', a ' + (future - birth) + " years old" + " "+job
console.log(suraj);
//
const surajNew = `I'm ${nameMy}, a ${future - birth} years old ${job} `;
console.log(surajNew);
//
console.log("my name is \n\
suraj \n\
yoyoyoyoyo")
//
console.log(`my
name
is
suraj`)
//
const agee = 19;
const isOldEnough = agee>=18;
console.log(isOldEnough);
//
if(isOldEnough) {
console.log("you are allowed to drive")
}else {
    const yearsLeft = 18 - agee;
    console.log(`you are minor. Wait another ${yearsLeft} years`)
}
//
let century;
const birthy = 2005;
if(birthy<=2000){
     century = 20;

}else {
     century = 21;
}
console.log(century);
//
//In type conversion means we manually convert the data type.
//In type coercion the JS automatically converts the data type.
const inputYear = "1991";
console.log(Number(inputYear)+18); //This is diffrent.
console.log(inputYear + 18); //This is diffrent.
console.log(typeof(Number(inputYear)), typeof(inputYear));
//
console.log(Number("suraj")); //NaN:- not a number. (invalid number)
//
console.log(String(23) + " suraj", 23); //number to string.
//
//type coercion.
console.log("I am " + 23 + " years old") //because of the + operation the number is convertewd to the string, coercion done by JS.
console.log("I am ",23," years old")
//
console.log("23" - "10" - 3); //here js converted strings to the number because of the - operator.
//
console.log("23"*"2") //here also string is converted into number because of the * operator.
//
let n = "1" + 1; // "11"
n = n - 1; // then "11" string will be converted to the number because of the - operator.
// and the output will be 11 - 1 = 10;
console.log(n);
//
console.log(2+2+3+"3"); // string "73".
//
console.log("10"-"20"-"2"-5+"20"); // string "-1720".
//
// 5 falsy values.
// 0, '', undefined, null, NaN.
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(NaN));
//
let money = 0;
if(money){
    console.log("dont spend it all")
}else{
    console.log("you should get a job!")
}
//
let height ; // here height is undefined and undefined is falsy value.
if(height){
    console.log("yay height is defined");
}else{ 
    console.log("height is undefined")
}
//
// equality operators.
let aage = 18;
if ( aage === 18 ) console.log("yay you are eligable.")
// It just checks if the aage is same as the number 18.
//
let number = "20";
if(number==20){ // Here coercion is performed by the JS.
    console.log("yay completed");// String "20" is converted to the number 20 and then they both are same so it gives true.
}
//
if ( aage === 18 ) console.log("yay you are eligable.(strict)") // Change the value of aage if wanna see the change.
if ( aage == 18 ) console.log("yay you are eligable.(loose)")
//

/*
//const favourite = prompt("whats your fav number?");
const favourite = Number(prompt("whats your fav number?"));
console.log(favourite);
console.log(typeof favourite); //the inputted value will be in string only.
//
if(favourite == 23){ // this is loose one which will convert the string to the number and compare it to the number 23.
    console.log("Cool! 23 is an amazing number")
}
//
if(favourite === 23){ // this will check if the value is same as the 23 number strictly.
    console.log("Very good! 23 is an amazing number")
} else if(favourite === 7){
    console.log("you are again right!")
}else if(favourite === 9){
    console.log("Wow 9 is also a great number.")
}else{
    console.log("number is not 23, 9 or 7")
}
//
// if(favourite != 23){} // loose version.
if( favourite !== 23) console.log("why not 23?????");
*/
//
// Boolean logic.
const hasLicense = true;
//const hasVision = true;
const hasVision = true;
console.log(hasLicense && hasVision);
console.log(hasLicense || hasVision);
console.log(!hasLicense);
//
const shouldDrive = hasLicense && hasVision;
if(shouldDrive){
    console.log("she is able to drive")
} else{
    console.log("someone else should drive")
}
//
const isTired = true;
console.log(hasLicense || hasVision || isTired);
//
if(shouldDrive && !isTired){
    console.log("she is able to drive")
} else{
    console.log("someone else should drive")
}
//
//switch statement.
 const day = "monday";
switch(day) {
    case "monday":
        console.log("do gym");
        break; // putting "break" after each work done is very important in switch statement.
    case "tuesday":
        console.log("do something");
        break;
    case "wednesday":
    case "thursday":
        console.log("write code");
        break;
    case "friday":
        console.log("record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("enjoy weekend");
        break;
    default:
        console.log("not a valid day");
}
//if else alternative for the baove code.
const dayy = "friday";
if(dayy === "monday"){
    console.log("go to the gym");
}else if(dayy === "tuesday"){
    console.log("eat protien");
}else if(dayy === "wednesday"){
    console.log("eat food");
}else if(dayy === "thursday"){
    console.log("sleep");
}else if(dayy === "friday"){
    console.log("study");
}else if(dayy === "saturday" || dayy === "sunday"){
    console.log("enjoy weekend");
}else{
    console.log("not a valid day");
}
//
//conditional/ternary operator.
const agge = 23;
agge>=18 ? console.log("i like to drink") : console.log("i am under aged");
//
const drink = agge >= 18 ? "wine" : "water";
console.log(drink);
//
let drink2;
if(agge>=18){
    drink2 = "wine";
}else{
    drink2 = "water";
}
console.log(drink2);
//
console.log(`i like to drink ${agge >= 18 ? "wine" : "water"}`);
// the point here is that we cannot use the "if statement" in this backticks,
// but in replacement of that we can use the ternary operator in it.
// so its very useful and the work can be done in replacement of if statement.
//
const bill = 275;
let tip = bill*0.15;
let tip2 = bill*0.2;
let amount;
const total = bill<=300 ? amount = bill+tip : amount=bill+tip2;
console.log(`The bill is ${bill}, the tip is ${bill<=300?tip:tip2} and the total is ${amount}.`);
//