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

    //bind method.
    console.log("---bind method---");
    //so instead of doing "call()" to change "this" for every other object and again and again so we can just do "bind()" so "this" will be permanently be binded to that object.

    const bookEW = books.bind(eurowings);
    const bookLH = books.bind(lufthansa);
    const bookLX = books.bind(swiss);

    bookEW(23,"steven");
    
    //fixed argument.
    const bookEW23 = books.bind(eurowings, 23);
    bookEW23("jacob");

    //with eventlisteners

    lufthansa.planes = 300;
    lufthansa.buyPlane = function(){
        console.log(this);
        this.planes++;
        console.log(this.planes);
    };
    
    //in an event handler the "this" keyword always points to the element on which the handler is attached to.

    //in this situation the "this" will point to the button element.
    document.querySelector(".buy").addEventListener("click",lufthansa.buyPlane);

    //in this with "bind" the "this" will point to the lufthansa object! and thats what we wanted.
    document.querySelector(".buy").addEventListener("click",lufthansa.buyPlane.bind(lufthansa));

    // partial application.
    const addTax = (rate,value) => value+value*rate;
    console.log(addTax(0.1,200));

    const addVAT = addTax.bind(null, 0.23);
    // addVAT = value => value+value*0.23; // same as.
    console.log(addVAT(300));


    const addTAX2 = function(rate){
        return function(value){
            const x = value+value*rate;
            return x;
        }
    };

    const addVAT2 = addTAX2(0.45);
    console.log(addVAT2(200));
    console.log(addVAT2(500));

    console.log("---Challenge 1---");

    const poll = {
        question: 'What is your favourite programming language?',
        options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
        // This generates [0, 0, 0, 0]. More in the next section 😃
        answers: new Array(4).fill(0),

        registerNewAnswer(){
            const prompt2 = prompt(`What is your favourite programming language? \n 0: Javascript \n 1: Python \n 2: rust \n 3: C++ `);

            if(prompt2 >= 0 && prompt2 < this.answers.length){
            if(prompt2 === 0 || 1 || 2 || 3){
                this.answers[prompt2] ++;
            }
        }else{
            alert("Enter a number between 0 - 3")
        }
        console.log(poll.answers);
        this.displayResults("string");
        
        },
        displayResults(type = "array"){
            if(type === "array"){
                console.log(poll.answers);
            }else if(type === "string"){
                console.log(`Poll results are ${this.answers.join(", ")}`);
            }
        }
    
    };
    
    document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

    // poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
    // poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
    // poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

    console.log("---Challenge complete---");

    //

    console.log("---Immediately Invoked Function Expressions (IIFE)---");
    //Immediately Invoked Function Expressions (IIFE)

    //normal function.
    // const runOnce = function(){
    //     console.log("this will never run again!");
    // }
    // runOnce();

    //IIFE
    (function(){
        console.log("this will never run again!");
        const isprivate = 23;
    })(); 
    // console.log(isprivate); //wont work, private scoped.

    //arrow function.
    (()=>console.log("this will never run again!"))();
    
    {
        const isPrivate = 34; // blocked scope
        var notPrivate = 23; // global scope
    }
    // console.log(isPrivate);
    console.log(notPrivate);

    //Closures.
    console.log("---Closures---");

    const secureBooking = function(){

        let passengerCount = 0;
        return function(){
            passengerCount ++;
            console.log(`${passengerCount} passengers`);
        }
    };

    const booker = secureBooking();
    booker();
    booker();
    booker();
    booker();
    booker();

    console.dir(booker);


    //EX: 1
    let f;
    const g = function(){
        const a = 23;
        f = function(){
            console.log(a * 2);
        }
    }

    const h  = function(){
        const b = 777;
        f = function(){
            console.log(b * 2);
        }
    }

    g();
    f();

    console.dir(f) // here scope a = 23.
    // re-assigned f function by h 
    h();
    f();

    console.dir(f) // here scope b = 777.

    // EX:2
    const boardPassengers2 = function(n , wait){
        const perG = Math.round(n / 3);

        setTimeout(function(){
            console.log(`We are now boarding all ${n} passengers`);
            console.log(`There are 3 groups each with ${perG} passengers`);
        },wait * 1000);

        console.log(`Will start boarding in ${wait} seconds....`);
        };

        const perG = 1000; // this wont be used because there is the same variable in its parent scope so it wont go till the global scope.
        boardPassengers2(180,3);

        //
        //simple challenge.
        (function(){
            const header = document.querySelector("h1");
            header.style.color = "red";
            
            document.body.addEventListener("click",
                function(){
                    header.style.color = "blue"    
                }
            );
        
        })()
        //

        