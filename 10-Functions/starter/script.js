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

    //check notes.

    console.log("---Functions Accepting Callback Functions---");

    const oneWord = function(str){
        return str.replace(/ /g,"").toLowerCase();
    }

    const upperFirstWord = function(str){

        const [first, ...other] = str.split(" ");
        return [first.toUpperCase(), ...other].join(" ");
    };

    // Higher-order function
    const transformer = function(str, fn){
        console.log(`original string: ${str}`);
        console.log(`transformed string: ${fn(str)}`);

        console.log(`Transformed by: ${fn.name}`);
    }
    transformer("javascript is the best", upperFirstWord);  // function value only. not function call "upperFirstWord()".
    transformer("javascript is the best", oneWord);
    //callbacks.
    //in event listeners.
    const high5 = function(){
        console.log("hiiiii");
    };
    document.body.addEventListener("click", high5);

    //in array methods.
    ["suraj","bob","jay"].forEach(high5);

    //returning function in a function
    const greet = function(greeting){
        return function(name){
            console.log(`${greeting} ${name}`);
        }
    };
    const greeter = greet("hey");
    greeter("suraj");
    greeter("marlin");
    //same as.
    greet("hello")("bob"); //this type of method is used in the function returning funcitons catagory.


    //challenge, write the same with the arrow funciton.
    const greet2 = (greeting) => {
        return (name)=>{
            console.log(`${greeting} ${name}`);
        }
    };
    //another way with function returning another function with arrow function.
    const greet3 = greeting=> name=> console.log(`${greeting} ${name}`);
       
    // const greeter2 = greet2("hello");
    // greeter2("mahesh");
    // const greeter3 = greet2("hi");
    // greeter3("xavier");
    greet2("hello")("messi")
    greet3("hi")("ronaldo")

    //
    console.log("---The call and apply Methods---");

    const lufthansa = {
        airline: "lufthansa",
        code: "LH",
        bookings: [],
        // book: function(){}, //old syntax
        book(flightNum,name){ // new syntax.
            console.log(`${name} booked a seat on ${this.airline} flight ${this.code} ${flightNum}`);
            this.bookings.push({flight: `${this.code} ${flightNum}`,name});
        },
    };
    lufthansa.book(239,"suraj maru");
    lufthansa.book(635,"john smith");
    console.log(lufthansa);

    
    const eurowings = {
        airline: "eurowings",
        code: "EW",
        bookings: [],
    };
    
    const books = lufthansa.book; // for this "this." is undefined.
    // books(23,"bob"); // there fore it fails here.

    // call method.
    books.call(lufthansa,453,"suraj");
    console.log(lufthansa);
    books.call(eurowings,674,"jay");
    console.log(eurowings);

    const swiss = {
        airline: "swiss airlines",
        code: "LX",
        bookings: [],
    };
    books.call(swiss,454,"mary cooper")
    console.log(swiss);

    // apply method.
    //it wont take the list like call, but it will take the array of the arguments.
    const flightData = [576, "suraj cooper"];
    books.apply(swiss,flightData);
    console.log(swiss);
    //
    books.call(swiss, ...flightData); //this here is the same as the appply() method as shown above.