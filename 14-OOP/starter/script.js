'use strict';

//Constructor Functions and the new Operator
console.log("---Constructor Functions and the new Operator---");

const Person = function(firstName, birthYear){
    // Instance properties.
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never create a method inside a constructor function.
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear);
    // }; 
    // Rather then this we will use prototypal inhertiance for this.
    
};


 const suraj = new Person("suraj", 2005);
 console.log(suraj);
 // 1. new empty object is created.
 // 2. function is called and the "this" keyword will be set to this newly created empty object.
 // 3. this newly created object is linked to the prototype.
 // 4. function automatically retuen the empty object.

const bob = new Person("bob",2000);
const jack = new Person("jack",1990);
console.log(suraj, bob, jack);

console.log(suraj instanceof Person);

Person.hey = function(){
    console.log("Hey there!");
    console.log(this);
};

Person.hey();


//Prototypes
console.log("---Prototypes---");

console.log(Person.prototype);

Person.prototype.calcAge = function(){
    console.log(2025 - this.birthYear);
};

suraj.calcAge();
bob.calcAge();
jack.calcAge();

console.log(suraj.__proto__);
console.log(suraj.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(suraj));
console.log(Person.prototype.isPrototypeOf(bob));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = "Homo";
console.log(suraj.species, bob.species);

console.log(suraj.hasOwnProperty("firstName"));
console.log(suraj.hasOwnProperty("species"));

//Prototypal Inheritance and The Prototype Chain
console.log("---Prototypal Inheritance and The Prototype Chain---");

// full theory.

// Prototypal Inheritance on Built-In Objects
console.log("---Prototypal Inheritance on Built-In Objects---");

console.log(suraj.__proto__.__proto__);
console.log(Person.prototype.__proto__);// suraj.__proto__ = Person.prototype
console.log(Person.prototype.__proto__.__proto__); // Object.prototype = null


console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [1,2,3,3,4,5,6,4,5,6,7,4]; // new Array === []
console.log(arr.__proto__);
// at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
// map: ƒ map()
// pop: ƒ pop()
// push: ƒ push()
// reduce: ƒ reduce()
// reduceRight: ƒ reduceRight()
// etc...

// "arr" does not contain all those properties but it will inherit from the prototype.

console.log(arr.__proto__ === Array.prototype);
// "Array" is a constructor function.

console.log(arr.__proto__.__proto__);
console.log(Array.prototype.__proto__);

// Creating our own new method on the prototype property.
Array.prototype.unique = function(){
    return [...new Set(this)]
};
console.log(arr.unique()); 
// Now we can just call this method on any array we want.

// We should not do this..
// 1. If in future js updates its features of prototype and adds the same method as we created but it has some diffrent functionality so your code will use that diffrent method not the one created by you.

// 2. Working with team will be a big problem with this because if the multiple developers implement the same method with the diffrent name then it will create soo many bugs, so thats why its not worth doing.

const h1 =  document.querySelector("h1");
console.dir(h1);

console.dir(x => x + 1);

///////////////////////////////////////
console.log("---Coding Challenge #1---");
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

*/

const Car = function(make,speed){
    this.make = make;
    this.speed = speed;
};


Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.break = function(){
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
};
const carObj1 = new Car("BMW", 120);
const carObj2 = new Car("Mercedes", 95);

carObj1.accelerate();
carObj1.break();

carObj2.accelerate();
carObj2.break();

console.log("---Coding Challenge #1 Complete---");

// ES6 Classes
console.log("---ES6 Classes---");

// Classes are special type of functions.

// Class expression.
// const PersonCl2 = class {

// }

// Class declaration.
class PersonCl { 
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods.
    // Methods will be added to the .prototype property.
    calcAge(){
        console.log(2025 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2025 - this.birthYear;
    }

    // set a property that already exists.
    set fullName(name){
        console.log(name);
        if(name.includes(" ")) this._fullName = name;
        else alert(`${name} is not a full name`);
    }

    get fullName(){
        return this._fullName;
    }

    // Static method.
    static hey(){
        console.log("hey there");
        console.log(this);        
    }
}

PersonCl.hey();

// This 'new' constructor will retun a new object that will be stored in bob2.
const bob2 = new PersonCl("bob Dave",2000);
console.log(bob2);
bob2.calcAge();
console.log(bob2.age);

// const maru = new PersonCl("suraj", 1923);

console.log(bob2.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function(){
    //     console.log(`Hey ${this.firstName}`);
    // }
    bob2.greet(); // This also works here.
    
    // 1. Classes are not hoisted.
    // 2. Classes are also first-class citizes.
// 3. Classes are executed in the strict mode.

//Setters and Getters
console.log("---Setters and Getters---");


// In simple object literals.
const account = {
    owner : "Suraj",
    movements: [200,345,653,23,32,43],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        return this.movements.push(mov);
    },
};

console.log(account.latest);

account.latest = 34;
console.log(account.movements);

// In classes.
// Above on the lines from 175 to 197.

//Static methods.
console.log("---Static methods---");

// Above on the lines from 201 to 208.

//Object.create
console.log("---Object.create---");

const PersonProto = {

    //method
    calcAge(){
        console.log(2025 - this.birthYear);
        console.log(this.firstName,this.birthYear);
    },

    //method
    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const p1 = Object.create(PersonProto); // We set the prototype to the object here.
console.log(p1);
p1.name = "suraj";
p1.birthYear = 200;
p1.calcAge();
// So here the "PersonProto" object is in the prototype of the new created p1 object. and it will inherit that "calcAge" function from it.

console.log(p1.__proto__);
console.log(PersonProto);
console.log(p1.__proto__ === PersonProto);

const p2 = Object.create(PersonProto);
// Here the diffrence is that we are gonna set the opject properties in a nice way and not like how we did above.
p2.init("suraj", 1989);
p2.calcAge();
// SO this is why we can call calcAge and init on the p2 object.

console.log("---Coding Challenge #2---");
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

*/
    class o{
        constructor(make,speed){
            this.make = make;
            this.speed = speed;
        }
        accelerate(){
            this.speed += 10;
            console.log(`${this.make} going at ${this.speed} km/h`);
        }
        
        break(){
            this.speed -= 5;
            console.log(`${this.make} going at ${this.speed} km/h`);
        }

        get speedUS(){
            return this.speed/1.6; 
        }

        set speedUS(s){
            this.speed = s * 1.6;
        }
    }

const ford = new o("ford", 120);

console.log(ford.speedUS); // We transformed a method to a property by using a getter
ford.accelerate();
ford.break();
ford.speedUS = 50; 
console.log(ford); // We set the speed to kph from mph.

console.log("---Coding Challenge #2 Complete---");

// Inheritance Between "Classes": Constructor Functions
console.log('---Inheritance Between "Classes": Constructor Functions----');

const Person2 = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person2.prototype.calcAge = function(){
    console.log(2030 - this.birthYear);
};

const Student2 = function(firstName,birthYear, course){
    Person2.call(this,firstName,birthYear);
    this.course = course;
};

// Linking prototyeps
Student2.prototype = Object.create(Person2.prototype);

// Student2.prototype = Person2.prototype; Bad code.

Student2.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student2("mike", 2010, "computer science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student2);
console.log(mike instanceof Person2);
console.log(mike instanceof Object);

Student2.prototype.constructor = Student2;
console.dir(Student2.prototype.constructor);

console.log("---Coding Challenge #3---");
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

*/


const Car2 = function(make,speed){
    this.make = make;
    this.speed = speed;
    
};

Car2.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
};

Car2.prototype.break = function(){
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
};

const Ev = function(make, speed, battery){
    Car2.call(this,make,speed);
    this.battery = battery;
};

Ev.prototype = Object.create(Car2.prototype);

Ev.prototype.chargeBattery = function(chargeTo){
     this.battery = chargeTo;
};

Ev.prototype.accelerate = function(){
    this.speed += 20;
    this.battery--; // I wrote this "this.battery =  this.battery * 0.1";
    console.log(`${this.make} going at ${this.speed} km/h with a charge of ${this.battery}%`);
};


const carObj = new Ev("Tesla", 120, 23);

carObj.chargeBattery(90);
console.log(carObj);
carObj.break();
carObj.accelerate();

console.log("---Coding Challenge #3 Complete---");

// Inheritance Between "Classes": ES6 Classes
console.log('---Inheritance Between "Classes": ES6 Classes---');

class PersonClass { 
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods.
    // Methods will be added to the .prototype property.
    calcAge(){
        console.log(2025 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2025 - this.birthYear;
    }

    // set a property that already exists.
    set fullName(name){
        console.log(name);
        if(name.includes(" ")) this._fullName = name;
        else alert(`${name} is not a full name`);
    }

    get fullName(){
        return this._fullName;
    }

    // Static method.
    static hey(){
        console.log("hey there");
        console.log(this);        
    }
}

class StudentClass extends PersonClass {
    constructor(fullName,birthYear,course){
        // Super() always needs to happen first. Before doing "this".
        super(fullName,birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    // calcAge(){
    //     console.log(`I am ${2030 - this.birthYear} years old but as a student I feel more like ${2030 - this.birthYear + 10}`);
    // }
};

// const jay = new StudentClass("jay",2003);
const jay = new StudentClass("jay jonas",2003, "Computer science" );
jay.introduce();
jay.calcAge();

//  Inheritance Between "Classes": Object.create
console.log('---Inheritance Between "Classes": Object.create---');

const PersonProto2 = {
    calcAge(){
        console.log(2030 - this.birthYear);
    },

    init(firstName,birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto2);

const StudentProto2 = Object.create(PersonProto2);

StudentProto2.init = function(firstName,birthYear, course){
    PersonProto2.init.call(this,firstName,birthYear);  // Manual way of super key-word.
    this.course = course; // Creating a new own property.
};

StudentProto2.introduce = function(){ // Creating a new method.
     console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const bro = Object.create(StudentProto2);
bro.init("suraj",2000,"cs")
bro.introduce();
bro.calcAge();

// Another Class Example
console.log("---Another Class Example---");

class Account {
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`);
    };

    // Public interface.
    // These methods are the interface to our object.
    // And we also call this API.
    deposit(val){
        this.movements.push(val);
    };

    withdraw(val){
        this.deposit(-val)
    };

    approveLoan(val){
        return true;
    };

    requestLoan(val){
        if(this.approveLoan(val)){
            this.deposit(val);
            console.log("Loan approved");
        }
    };
};

const acc1 = new Account("Suraj", "INR", 1111);

// This is not a good idea/practice to manually interact with properties like this.
// acc1.movements.push(200); 
// acc1.movements.push(-250);

// Its a lot better that we create a method which will interact with those properties.
acc1.deposit(250);
acc1.withdraw(140); 
// Like here in withdraw the use should not care about the minus sign in while passing the value he just needs to pass a value for to deposit or withdraw.
// So here the public interface above is taking the care of it.
acc1.requestLoan(1000);
acc1.approveLoan(1000); // In real life we should not be able to even access these type of methods, its a internal method that the "requestLoan" method will only use and no one else.

console.log(acc1);
console.log(acc1.pin); // The pin should not be accessible like this.

// Encapsulation: Private Class Fields and Methods
console.log("---Encapsulation: Private Class Fields and Methods---");
// Encapsulation: Private Class Fields and Methods.
// In other common OOP programming languages, what we call "properties" in javascript we call "fields" in those common pure OOb based programming languages.
// Now with this class features we now have the abilities wwe didnt had before
// Originally there was no easy way of hiding the properties or methods from the outside of the class or of a constructor fucntions.
// But now with "private" class field we are now able to do that.
// All this is again forcing the class pattern more into the js which is not a class base language its a prototype based language.
// But its starting to look more like a class based programming language like c++ or java. At least when it comes to object oriented programming.
// But as long as you know "construstor functions" and "prototypal inheritance" we are chilling.

// Features:-
// 1. public fields
// 2. private fields
// 3. public methods
// 4. private methods
// STATIC version of these 4

// Whats a field? 
// A field is as a property which will be on all the class instances but not on the prototype, thats why we also call it as a "public instance field".

// These fields will not get inherited unlike the methods that will be added to the prototype for instances to inherit them.

class Account2 {

    locale = navigator.language; // Public field.
    bank = "Bankist"; // Is the same as " this.bank = "Bankist" " // Public field.

    #movements = []; // Private field.
    #pin; // Private field.

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin; // also changing here too
        // this.movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`);
    };

    // Public interface (API)
    getMovements(){ // This method is not Chainable.
        return this.#movements;
    };

    deposit(val){ // Public method
        this.#movements.push(val); // also changing here too.
        return this;
    };

    withdraw(val){ // Public method
        this.deposit(-val);
        return this;
    };

    #approveLoan(val){ // Private method
        return true;
    };

    requestLoan(val){ // Public method
        if(this.#approveLoan(val)){  // also changing here too
            this.deposit(val);
            console.log("Loan approved");
        }
        return this;
    };

    // Static is used directly on the class and not the object itself.
    // Public static field method
    static test(){
        console.log("hi");
    };

    // Private static field method
    static #test2(){
        console.log("hi");
    };
};

const acc2 = new Account2("Suraj", "INR", 1111);
acc2.deposit(300);
acc2.withdraw(400);
// acc2.movements = []; // What is this rubbish we dont want this to happen.
console.log(acc2.bank);
// console.log(acc2.#pin);
// console.log(acc2.#movements);
// acc2.approveLoan(1000);
console.log(acc2);

// Account2.test();
// Account2.#test2();

// Chaining Methods of the methods of classes
console.log("---Chaining Methods of the methods of classes---");

const movements = acc2
    .deposit(20)
    .withdraw(100)
    .withdraw(200)
    .requestLoan(5000)
    .deposit(500)
    .getMovements(); // But can be placed at the end and it wil;l work.

    console.log(acc2);
    console.log(movements);

    console.log("---Coding Challenge #4---");
    ///////////////////////////////////////
    // Coding Challenge #4

    /* 
    1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
    2. Make the 'charge' property private;
    3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

    DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

    */
 
    class CarCl {
        constructor(make,speed){
            this.make = make;
            this.speed = speed;
            
        };
        accelerate = function(){
            this.speed += 10;
            console.log(`${this.make} going at ${this.speed} km/h`);
        };
        
        break = function(){
            this.speed -= 5;
            console.log(`${this.make} going at ${this.speed} km/h`);
            return this;
        };
    }

    class EVCl extends CarCl {

        #battery;
         constructor(make,speed,battery){
            super(make, speed)
            this.#battery = battery;
            
        }

        accelerate = function(){
            this.speed += 20;
            this.#battery--; // I wrote this "this.battery =  this.battery * 0.1";
            console.log(`${this.make} going at ${this.speed} km/h with a charge of ${this.#battery}%`);
            return this;
        }
        
        chargeBattery = function(chargeTo){
             this.#battery = chargeTo;
             return this;
        }
    }

    const Rivian = new EVCl("Rivian", 120, 23);

    Rivian
        .chargeBattery(90)
        .accelerate()
        .break();

    console.log(Rivian); 
    // console.log(Rivian.#battery);
    
    console.log("---Coding Challenge #4 Complete---");