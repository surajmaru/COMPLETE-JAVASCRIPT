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

   const map = L.map('map').setView(coords, 13);
   // The "L" here is basically the main function that leaflet gives us as an entry point.
   // So this is a namespace which the leaflet provides us with.
   // And the "L" has couple of methods which we can use. like the "map, tileLayer, marker, etc..."

   // Here this "map" in the bracket is the id in the html in the div which we used to displa the map using its id.

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

},function(){
    alert("Could not get your location")
});

// console.log(firstName);

