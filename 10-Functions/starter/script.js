'use strict';

//default parameters.
console.log("---default parameters---");

const book = [];

const createBooking = function(fNumber,numPass = 1, price = 199 * numPass){ 
    //new es method

    // numPass = numPass || 1; //es5 old method
    // price = price || 20000;
    const booking = {
        fNumber,
        numPass,
        price,
    }
    console.log(booking);
    book.push(booking);
    console.log(book);
}

createBooking("LH123");
createBooking("LH213",2,345);
createBooking("FJ345",4);
createBooking("FJ345",6);
createBooking("dfgfd",100);
createBooking("dfgfd",undefined, 100);

//How Passing Arguments Works: Value vs. Reference
console.log("---How Passing Arguments Works: Value vs. Reference---");

const flight = "LH123";
const suraj = {
    name: "suraj",
    passport: 345356233,
    }

    const checkIn = function(flightNum, passenger){

        flightNum = "LH999",
        passenger.name = "Mr." + passenger.name;

        if(passenger.passport === 345356233)
            console.log("check in");
        else
            console.log("wrong passport");
        
    }
    checkIn(flight,suraj);
    console.log(flight);
    console.log(suraj);

    const newPassport = function(person){
        person.passport = Math.trunc(Math.random()*10000000);
    }
    newPassport(suraj);
    checkIn(flight, suraj);

    //
    //First-Class and Higher-Order Functions
    console.log("---First-Class and Higher-Order Functions---");