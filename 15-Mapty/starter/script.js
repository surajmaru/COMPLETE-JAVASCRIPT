'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
//  let map, mapEvent; // Creating global variable cause to use it in other events and functions.

// Managing Workout Data: Creating Classes
console.log("---Managing Workout Data: Creating Classes---");

class Workout{
    // This is the new method we are doing below "cutting edge javascript" and its not yet part of the javascript itself.
    date = new Date();
    id = (Date.now() + "").slice(-10);
    
    constructor(coords, distance, duration){
        // this.date = ...
        // this.id = ...
        this.coords = coords; // [lat, long]
        this.distance = distance;
        this.duration = duration;
    }
};

class Running extends Workout {
    type = "running"; // This is equal to "this.type = "running"" in the constructor.
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calcPace();

    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace
    }
};
class Cycling extends Workout {
    type = "cycling"; // This is equal to "this.type = "cycling"" in the constructor.
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed(){
        // km/hr
        this.speed = this.distance / (this.duration / 60);
        return this.calcSpeed
    }
};

// const run1 = new Running([39,-12], 5.2,24,178);
// const cycling1 = new Cycling([39,-12], 27,95,523);
// console.log(run1,cycling1);



// This main class contains all the main functionalities.
class App {
    // We converted those gloval variables to the Private fields of this class. And used them.
    #map;
    #mapEvent;
    #workout = [];

    constructor(){
        this._getPosition(); // Here we did that.
        // This is a eventHandler so we can directly write it here cause the constructor will load and runn this eventHandler as soon as the page loads.
        form.addEventListener("submit", this._newWorkout.bind(this)); 
        // Here using "this" directly will point to the "form" cause this is a eventHandler and not to the class so, again we will use the "bind" method.

        // Same goes for this eventHandler too.
        inputType.addEventListener("change", this._toggleElevationField);
    }

    _getPosition(){

    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition( this._loadMap.bind(this),
        
        function(){
            alert("Could not get your location")
        });
    }

    _loadMap(position){
       
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude,longitude]

            this.#map = L.map('map').setView(coords, 13);
        
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

        // Handling clicks on the map.
        console.log(map);
        this.#map.on("click", this._showForm.bind(this)); 
        // Here also like the "this" will point to this eventHandler so, we have to manually bind the this.
        
    }
    
    _showForm(mapE){
        console.log(mapE);
        console.log(this);
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
       
    }

    _toggleElevationField(){
         inputElevation.closest(".form__row").classList.toggle("form__row--hidden");

        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _newWorkout(e){

        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
            
        const {lat, lng} = this.#mapEvent.latlng;

        e.preventDefault();

        // Steps:- 

        // Get data from the form.
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;

        // If workout running then create the running object.
        if(type === "running"){
            const cadence = +inputCadence.value;
            // Check if its valid.
            if(
            // !Number.isFinite(distance) || 
            // !Number.isFinite(duration) || 
            // !Number.isFinite(cadence)
            !validInputs(distance,duration,cadence) || 
            !allPositive(distance,duration,cadence))
            return alert("Inputs have to be a positive numbers");

            workout = new Running([lat,lng],distance,duration,cadence);
            
        }
        

        // If workout cycling then create the cycling object.
        if(type === "cycling"){
            const elevation = +inputElevation.value;
            // Check if its valid.
            if(
            // !Number.isFinite(distance) || 
            // !Number.isFinite(duration) || 
            // !Number.isFinite(elevation)
            !validInputs(distance,duration,elevation) || 
            !allPositive(distance,duration)) 
            return alert("Inputs have to be a positive numbers");

            workout = new Cycling([lat,lng],distance,duration,elevation);

        }

        // Add the new object to the workout array.
        this.#workout.push(workout);
        console.log(workout);

        // Render workout on the map as the marker.
        this._renderWorkoutMarker(workout);
        
        // Render workout on the list.
        
        // Hide the form + clear the input fields.
        
        // Clear the input fields.
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        
    }
    
    _renderWorkoutMarker(workout){
        console.log(this.#mapEvent);
         L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(workout.type)
        .openPopup();
    }

}
// We created the app object from the App class.
const app = new App();
// app._getPosition();
// app._showForm();
// app._toggleElevationField();
// instead of calling it like here, The constructor are called immediately as soon as the page loads so, we can call this method in the constructor directly, so the constructor will call this method as soon as the page loads.

// So here we just took out previous code and organised it into a good class based structure and thats it.


// Chat gpt link to understand everything:- "https://chatgpt.com/share/690e08ef-6b58-8002-8fa7-aab3d53c621f" 


/////////////////////////////////////////////////////////
// Using the Geolocation API
console.log("---Using the Geolocation API---");

// if(navigator.geolocation)
// navigator.geolocation.getCurrentPosition(function(position){
//    const {latitude} = position.coords;
//    const {longitude} = position.coords;
//    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
// },function(){
//     alert("Could not get your location")
// });
// This way we can create our own link with our curren location according to our browser.

// Displaying a Map Using Leaflet Library
console.log("---Displaying a Map Using Leaflet Library---");

// if(navigator.geolocation)
// navigator.geolocation.getCurrentPosition(function(position){
//    const {latitude} = position.coords;
//    const {longitude} = position.coords;
//    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//    const coords = [latitude,longitude]

//     map = L.map('map').setView(coords, 13);
//    // The "L" here is basically the main function that leaflet gives us as an entry point.
//    // So this is a namespace which the leaflet provides us with.
//    // And the "L" has couple of methods which we can use. like the "map, tileLayer, marker, etc..."

//    // Here this "map" in the bracket is the id in the html in the div which we used to display the map using its id.

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//         // Handling clicks on the map.
//         console.log(map);
//         map.on("click", function(mapE){
//             /////////////////////////////////////////////
//             mapEvent = mapE; // Here we assigned the "event" to a global variable so we can use it in other event later too.
//             form.classList.remove("hidden");
//             inputDistance.focus();
            
//             /////////////////////////////////////////////
//             // console.log(mapEvent);
//             // const {lat, lng} = mapEvent.latlng;
//             // L.marker([lat,lng])
//             // .addTo(map)
//             // .bindPopup(L.popup({
//             //     maxWidth: 250,
//             //     minWidth:100,
//             //     autoClose:false,
//             //     closeOnClick:false,
//             //     className: "running-popup"
//             // }))
//             // .setPopupContent("Workout")
//             // .openPopup();
//         });


// },function(){
//     alert("Could not get your location")
// });

// Displaying a Map Marker
console.log("---Displaying a Map Marker---");
// here we cant use the "addEventListener" on the whole map to get the marker coordinates.
// Instead we will do this.
// Shown above.

//  Rendering Workout Input Form
console.log("--- Rendering Workout Input Form---");
// for its event listener we are doing here outside the whole geolocation part.

// form.addEventListener("submit", function(e){
//     e.preventDefault();

//     // Clear the input fields.
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";


//     // Display the marker.
//     console.log(mapEvent);
//      const {lat, lng} = mapEvent.latlng;
//     L.marker([lat,lng])
//     .addTo(map)
//     .bindPopup(L.popup({
//         maxWidth: 250,
//         minWidth:100,
//         autoClose:false,
//         closeOnClick:false,
//         className: "running-popup"
//     }))
//     .setPopupContent("Workout")
//     .openPopup();

// });

// Here we toggle between the inputfield for cycling/running .
// inputType.addEventListener("change", function(){
//     inputElevation.closest(".form__row").classList.toggle("form__row--hidden");

//     inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
// });

// So till here what we did is that,
//1 previously we clicked on the map and then the marker with its custom options appeared.
//2 but now the change is that, when we click on the map then the input box on the left side appears.
//3 Then we attached a event handler on that form for "submit" and then when we submit the form, we display the marker on the map with its coordinates where clicked.
//4 But we needed these 2 variables "map" and "mapEvent" so we put them at the top as a global variable so we can use it later, And also we assigned: mapEvent = mapE; // Here we assigned the "event" to a global variable so we can use it in other event later too.
//5 Then we cleared each input field after we submit the form.
//6 Then for the 2 types in the input field "cycling/running" we need diffrent input field according to which is slected, so we toggle between them and show which one is selected. so, we basically toggle between them using a "eventListener" with event "change" on the "inputType". so, whenever theres a change in the "inputType" we toggle between those 2 input fields and show one accordingly.

// inputType → the dropdown/select for choosing "running" or "cycling".
// "change" event → fires whenever the user switches between options.
// .closest(".form__row") → finds the nearest parent element with that class (the full row of the input field).
// .classList.toggle("form__row--hidden") → adds/removes the form__row--hidden CSS class, which likely hides or shows that input field.

// Refactoring for Project Architecture
console.log("---Refactoring for Project Architecture---");

// So here we just took out previous code and organised it into a good class based structure and thats it.
// Its basically starting from the top.