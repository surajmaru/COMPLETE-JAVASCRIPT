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
let map, mapEvent; // Creating global variable cause to use it in other events and functions.

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

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position){
   const {latitude} = position.coords;
   const {longitude} = position.coords;
   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

   const coords = [latitude,longitude]

    map = L.map('map').setView(coords, 13);
   // The "L" here is basically the main function that leaflet gives us as an entry point.
   // So this is a namespace which the leaflet provides us with.
   // And the "L" has couple of methods which we can use. like the "map, tileLayer, marker, etc..."

   // Here this "map" in the bracket is the id in the html in the div which we used to display the map using its id.

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

        // Handling clicks on the map.
        console.log(map);
        map.on("click", function(mapE){
            /////////////////////////////////////////////
            mapEvent = mapE; // Here we assigned the "event" to a global variable so we can use it in other event later too.
            form.classList.remove("hidden");
            inputDistance.focus();
            
            /////////////////////////////////////////////
            // console.log(mapEvent);
            // const {lat, lng} = mapEvent.latlng;
            // L.marker([lat,lng])
            // .addTo(map)
            // .bindPopup(L.popup({
            //     maxWidth: 250,
            //     minWidth:100,
            //     autoClose:false,
            //     closeOnClick:false,
            //     className: "running-popup"
            // }))
            // .setPopupContent("Workout")
            // .openPopup();
        });


},function(){
    alert("Could not get your location")
});

// Displaying a Map Marker
console.log("---Displaying a Map Marker---");
// here we cant use the "addEventListener" on the whole map to get the marker coordinates.
// Instead we will do this.
// Shown above.

//  Rendering Workout Input Form
console.log("--- Rendering Workout Input Form---");
// for its event listener we are doing here outside the whole geolocation part.

form.addEventListener("submit", function(e){
    e.preventDefault();

    // Clear the input fields.
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";


    // Display the marker.
    console.log(mapEvent);
     const {lat, lng} = mapEvent.latlng;
    L.marker([lat,lng])
    .addTo(map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className: "running-popup"
    }))
    .setPopupContent("Workout")
    .openPopup();

});

// Here we toggle between the inputfield for cycling/running .
inputType.addEventListener("change", function(){
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");

    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});

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

