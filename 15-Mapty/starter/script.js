'use strict';

// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const editBtn = document.querySelector(".btn_edit");
const deleteBtn = document.querySelector(".btn_delete");
const deleteAllBtn = document.querySelector(".btn_deleteall");
//  let map, mapEvent; // Creating global variable cause to use it in other events and functions.

// Managing Workout Data: Creating Classes
console.log("---Managing Workout Data: Creating Classes---");

class Workout{
    // This is the new method we are doing below "cutting edge javascript" and its not yet part of the javascript itself.
    date = new Date();
    id = (Date.now() + "").slice(-10);
    clicks = 0;
    
    constructor(coords, distance, duration){
        // this.date = ...
        // this.id = ...
        this.coords = coords; // [lat, long]
        this.distance = distance;
        this.duration = duration;
    }
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`

    }
    click(){
        this.clicks++;
    }
};

class Running extends Workout {
    type = "running"; // This is equal to "this.type = "running"" in the constructor.
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();

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
        this._setDescription();
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
    #mapZoomLevel = 13;
    #editMode = false;
    #deleteMode = false;
    #editingWorkout = null;
   

    constructor(){
        this._getPosition(); // Here we did that.
        // This is a eventHandler so we can directly write it here cause the constructor will load and runn this eventHandler as soon as the page loads.

        // Get data from localStorage
        this._getLocalStorage();

        form.addEventListener("submit", this._newWorkout.bind(this)); 
        // Here using "this" directly will point to the "form" cause this is a eventHandler and not to the class so, again we will use the "bind" method.

        // Same goes for this eventHandler too.
        inputType.addEventListener("change", this._toggleElevationField);

        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));

        containerWorkouts.addEventListener("click", this._deleteWorlout2.bind(this))

        containerWorkouts.addEventListener("click", this._editWorkout2.bind(this))

        editBtn.addEventListener("click", this._editWorkout.bind(this));
        deleteBtn.addEventListener("click", this._deleteWorkout.bind(this));
        deleteAllBtn.addEventListener("click", this._deleteAllWorkout.bind(this)); 
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
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude,longitude]

            this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

        // Handling clicks on the map.
        // console.log(map);
        this.#map.on("click", this._showForm.bind(this)); 
        // Here also like the "this" will point to this eventHandler so, we have to manually bind the this.
       
        this.#workout.forEach(work => {
            this._renderWorkoutMarker(work)
            });
        
    }
    
    _showForm(mapE){
        // console.log(mapE);
        // console.log(this);
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
       
    }

    _toggleElevationField(){
         inputElevation.closest(".form__row").classList.toggle("form__row--hidden");

        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _hideForm(){
        // Clear the input fields.
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.classList.add("hidden");
        
    }

    _newWorkout(e){
        e.preventDefault();

        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
            
        // Steps:- 
        // Get data from the form.
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        /////////////////
        

         // Check if we're editing an existing workout
            if (this.#editingWorkout) {
            const workout = this.#editingWorkout;

            // Validate inputs
            if (type === "running") {
            const cadence = +inputCadence.value;
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Inputs have to be positive numbers");

            // Update properties
            workout.type = "running";
            workout.distance = distance;
            workout.duration = duration;
            workout.cadence = cadence;
            workout.elevationGain = undefined;
            workout.calcPace();
            } else if (type === "cycling") {
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert("Inputs have to be positive numbers");

            workout.type = "cycling";
            workout.distance = distance;
            workout.duration = duration;
            workout.elevationGain = elevation;
            workout.cadence = undefined;
            workout.calcSpeed();
            }

            // Update description (date or label)
            workout._setDescription();

            // Re-render in the DOM
            const oldWorkoutEl = document.querySelector(`[data-id="${workout.id}"]`);
            if (oldWorkoutEl) oldWorkoutEl.remove();

            this._renderWorkout(workout);

            // Update local storage
            this._setLocalStorage();

            // Clear editing mode
            this.#editingWorkout = null;
            this._hideForm();

            return;
        }


        /////////////////
        const {lat, lng} = this.#mapEvent.latlng; 
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
        this._renderWorkout(workout);
        
        // Hide the form + clear the input fields.
        this._hideForm();

        // Set localStorage.
        this._setLocalStorage();
        
    }
    
    _renderWorkoutMarker(workout){
        const marker = L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
        .openPopup();

        workout.marker = marker;
    }

    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>

        `;

        if(workout.type === "running")
            html += `
                    <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
            </div>
            </li>
            `
          
        
        if(workout.type === "cycling")
            html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
            </li>
            `;

            form.insertAdjacentHTML("afterend",html);
        }

        _moveToPopup(e){
            const workoutEl = e.target.closest(".workout");
            // console.log(workoutEl);

            if(!workoutEl) return;

            const workout = this.#workout.find(work => work.id === workoutEl.dataset.id);
            // console.log(workout);
            // console.log(this.#workout);

            this.#map.setView(workout.coords, this.#mapZoomLevel,{
                animate: true,
                pan: {
                    duration:1
                }
            });
            // workout.click();
        }

        _setLocalStorage(){
            
            const workoutsForStorage = this.#workout.map(work => {
            const cleanWork = {};

            // copy only simple (JSON-safe) properties
            for (const key in work) {
            if (key !== "marker") cleanWork[key] = work[key];
            }

            return cleanWork;
        });

            localStorage.setItem("workouts", JSON.stringify(workoutsForStorage));
        }

        _getLocalStorage(){
            const data = JSON.parse(localStorage.getItem("workouts"));
            console.log(data);

            if(!data) return;
////////////////////////
            // this.#workout = data; previously.

              this.#workout = data.map(work => {
            // Recreate proper class instances + fix date coming from local storage.
            let restored;
            if (work.type === "running")
            restored = Object.assign(
                new Running(work.coords, work.distance, work.duration, work.cadence),
                work
            );
            if (work.type === "cycling")
            restored = Object.assign(
                new Cycling(work.coords, work.distance, work.duration, work.elevationGain),
                work
            );

            // Convert date string back to real Date object
            restored.date = new Date(work.date);
            return restored;
        }); 
/////////////////////////////
            this.#workout.forEach(work => {
                this._renderWorkout(work);
            });
        }

        resetLocalStorage(){
            localStorage.removeItem("workouts");
            location.reload();
            // If you wanna reset the local storage then just type this "app.resetLocalStorage()" in the console and hit enter.
        }
 
        _editWorkout(){
           this.#editMode = true;
           const allWorkouts2 = document.querySelectorAll(".workout");
           allWorkouts2.forEach(workout=>{
            workout.classList.add("delete-mode")
           })
        }
        _editWorkout2(e){
            // guard clause.
            if(!this.#editMode) return;

            const workoutEl = e.target.closest(".workout");
            if (!workoutEl) return;

            // Find the workout object from your array
            const workout = this.#workout.find(work => work.id === workoutEl.dataset.id);
            if (!workout) return;

            // Save it to a private field
            this.#editingWorkout = workout;

            form.classList.remove("hidden");

            inputType.value = workout.type;

              // Update visible input fields based on workout type
            if (workout.type === "running") {
                inputCadence.closest(".form__row").classList.remove("form__row--hidden");
                inputElevation.closest(".form__row").classList.add("form__row--hidden");
            } else if (workout.type === "cycling") {
                inputElevation.closest(".form__row").classList.remove("form__row--hidden");
                inputCadence.closest(".form__row").classList.add("form__row--hidden");
            }

            inputDistance.value = workout.distance;
            inputDuration.value = workout.duration;

            if(workout.type === "running"){
                inputCadence.value = workout.cadence;
                inputElevation.value = "";
            } 
            
            if(workout.type === "cycling"){
                inputElevation.value = workout.elevationGain;
                inputCadence.value = "";
            }

            // inputType.dispatchEvent(new Event("change")); // 👈 ensures correct input fields show


             // Optionally scroll to the form
            form.scrollIntoView({ behavior: "smooth" });

            const allWorkouts2 = document.querySelectorAll(".workout");
            allWorkouts2.forEach(workout=>{
                workout.classList.remove("delete-mode")
            })
            this.#editMode = false;

        }

        // Deleting workout logic.
        _deleteWorkout(){
            this.#deleteMode = true;
           console.log(this.#deleteMode);
           console.log(this.#workout);
           const allWorkouts = document.querySelectorAll(".workout");
           allWorkouts.forEach(workout=>{
            workout.classList.add("delete-mode")  
           })
        }
        _deleteWorlout2(e){
            
            // only delete if delete mode is active (guard clause)
            if(!this.#deleteMode) return;

            const workoutEl = e.target.closest(".workout");
            if (!workoutEl) return;

            const workout = this.#workout.find(work => work.id === workoutEl.dataset.id);
            if (!workout) return;
            console.log(workout);

            // remove from workouts array
            this.#workout = this.#workout.filter(
                work => work.id !== workoutEl.dataset.id
            );

             // remove from DOM
            workoutEl.remove();

            // Remove the marker
            if(workout.marker)
            this.#map.removeLayer(workout.marker);

            // Reset localstorage
            this._setLocalStorage();

            // Return to default.
            this.#deleteMode = false;
            const allWorkouts = document.querySelectorAll(".workout");
             allWorkouts.forEach(workout=>{
            workout.classList.remove("delete-mode")  
           })

        }
        
        // Deleting all workout logic.
        _deleteAllWorkout(){
            this.#deleteMode = true;

            const confirmation = prompt("Are you sure? yes or no");

            if(confirmation && confirmation.toLowerCase() === "yes"){
                this.#workout = [];

                const workoutEl = document.querySelectorAll(".workout");
                workoutEl.forEach(el => el.remove());

                this.#map.eachLayer(layer => {
                    if (layer instanceof L.Marker) this.#map.removeLayer(layer);
                });

                this._setLocalStorage();

                this.#deleteMode = false;
            } else {
                alert("❌ Deletion cancelled.");
            }
        }
    }
// We created the app object from the App class.
const app = new App();
// app._getPosition();
// app._showForm();
// app._toggleElevationField();
// instead of calling it like here, The constructor are called immediately as soon as the page loads so, we can call this method in the constructor directly, so the constructor will call this method as soon as the page loads.

// So here we just took out previous code and organised it into a good class based structure and thats it.


// Chat gpt link to understand everything:- "https://chatgpt.com/share/690f3cc4-3c04-8002-a55f-29fb14819445"  


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