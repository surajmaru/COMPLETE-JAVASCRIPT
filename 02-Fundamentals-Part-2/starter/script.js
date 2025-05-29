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
