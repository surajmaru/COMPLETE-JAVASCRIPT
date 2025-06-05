'use strict';


// Problem 1:-
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperature1 = [3,-2,-6,-1,"error",9,13,17,15,14,9,5];
const temperature2 = [31,-22,-63,-120,"error"];
const temperature = temperature1.concat(temperature2);

//1) Understnding the problem:-
// -What is temp altitude? 
// Answer: Diffrence between highest and lowest temp
// -How to compute max and min temperatures?
// -What's a sensor error? And waht to do?

//2) Breaking into sub-problems
// -How to ignore errors?
// -Find max value in temp array
// -Find min value in temp array
// -Subtract min form max (amplitude) and return it

const calcTempAmplitude = function (temps){

    let max =  temps[0];
    let min = temps[0];

    
    for(let i=0; i < temps.length; i++ ){
        let currTemp = temps[i];
    if(typeof currTemp === "string") console.log("There was a string in the array");
    if(temps[i] > max) max = temps[i];
    if(temps[i] < min) min = temps[i];

    }

    console.log("This is the max value",max);
    console.log("This is the min value",min);
    return max-min;
};

calcTempAmplitude([1,4,6,3,"dfgdgdfgdfgdfg",5,2,5]);
// max will be 1
// max will be 4
// max will be 6 end.
const amplitude = calcTempAmplitude(temperature);
console.log(amplitude);
// As soon as we return something in a sunction and when we call it that thing writtten after the return will be executed in a whole.

//Problem 2:
//Function now should recieve 2 arrays of temps.

//1) Understanding the problem.
// -With 2 arrays, should we implement functionality twice?
//Answer: NO! just merge those 2 arrays in the beginning!.

//2) Breaking into sub-problems
// -How to merge 2 arrays?

// I solved this problem on the line number 8 and 9.

//BREAK

//debugging.

const measureKelvin = function(){
    const measurment = {
        type: "temp",
        unit: "celsius",
        //value: prompt("degree celsius");
        value:10
    }
    // console.table(measurment)
    
    // const Kelvin = measurment.value + 273;// Here is a bug.
    const Kelvin = Number(measurment.value) + 273;// Debugged.
    return Kelvin;
}
console.log(measureKelvin());

console.log("");
//BREAK
//using a debugger.
const calcTempAmplitudeBug = function (temps){

    let max =  0;
    let min = 0;

    
    for(let i=0; i < temps.length; i++ ){
        let currTemp = temps[i];
    if(typeof currTemp === "string") console.log("There was a string in the array");
    if(temps[i] > max) max = temps[i];
    if(temps[i] < min) min = temps[i];

    }

    console.log("This is the max value",max);
    console.log("This is the min value",min);
    return max-min;
};

calcTempAmplitude([1,4,6,3,"dfgdgdfgdfgdfg",5,3,5]);
// max will be 1
// max will be 4
// max will be 6 end.
const amplitudeBug = calcTempAmplitudeBug(temperature);
console.log(amplitude);

//BREAK.


const arr = [17,21,23];

let str = "";
for (let i = 0; i<arr.length; i++){
str += `${arr[i]} degrees in ${i+1} days, `

}
console.log(str);

//BREAK.

