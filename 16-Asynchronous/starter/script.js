'use strict';


// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

//  https://countries-api-836d.onrender.com/countries/ 

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = ""){
     const html = `
     <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend",html);
    countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
  countriesContainer.insertAdjacentText("beforeend",msg);
  countriesContainer.style.opacity = 1;
}

//  Asynchronous JavaScript, AJAX and APIs
console.log("---Asynchronous JavaScript, AJAX and APIs---");

// theory.

// Our First AJAX Call: XMLHttpRequest
console.log("---Our First AJAX Call: XMLHttpRequest---");

// const getCountryData = function(country){

// const request = new XMLHttpRequest(); // old school way.
// request.open("GET",`https://restcountries.com/v2/name/${country}`,true);
// request.send();

// request.addEventListener("load",function(){
//     const [data] = JSON.parse(request.responseText);
//     // const data = JSON.parse(request.responseText)[0]; Above one same as this.
//     console.log(data);

//     const html = `
//      <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//     `;

//     countriesContainer.insertAdjacentHTML("beforeend",html);
//     countriesContainer.style.opacity = 1;
// });
// };

// getCountryData("portugal");
// getCountryData("usa");
// getCountryData("brazil");
// Here it just loads the elemwnt that has loaded first form the server, so its not in the order, it just loads the first one who reaches the request first and others after it.

// How the Web Works: Requests and Responses
console.log("---How the Web Works: Requests and Responses---");
// theory.

// Callback Hell
console.log("---Callback Hell---");



// const getCountryAndNeighbour = function(country){

//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open("GET",`https://restcountries.com/v2/name/${country}`,true);
//     request.send();

//     request.addEventListener("load",function(){
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2).
//     const [neighbour] = data.borders;
//     if(!neighbour) return;
//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET",`https://restcountries.com/v2/alpha/${neighbour}`,true);
//     request2.send();

//     request2.addEventListener("load",function(){
//     const data2 = JSON.parse(this.responseText);
//     console.log(data2);
//     // Render country 2
//     renderCountry(data2, "neighbour");
//     })
// });
// };
// Here is a callback inside the callback, and what if we what the neightbour of the neightbour of the neighbour of the country then it would be a mess.
// so it would be callback inside callback inside callback....
// So this is called as "callback hell".

// getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa");

// Another example.
// setTimeout(()=>{
//     console.log("1 second passed");
//         setTimeout(()=>{
//         console.log("2 seconds passed");
//         setTimeout(()=>{
//         console.log("3 seconds passed");
//         setTimeout(()=>{
//         console.log("4 seconds passed");
//         setTimeout(()=>{
//         console.log("5 seconds passed");
//                  },1000);
//             },1000);
//         },1000);
//     },1000);
// },1000);

// Promises and the Fetch API
console.log("---Promises and the Fetch API---");

// Old way.
// const request = new XMLHttpRequest(); 
// request.open("GET",`https://restcountries.com/v2/name/${country}`,true);
// request.send();

// Promises.
// const request = fetch("https://restcountries.com/v2/name/portugal");
// console.log(request);

// const getCountryData = function(country){
//  fetch(`https://restcountries.com/v2/name/${country}`) // Here it reutrns a promise.
//  .then(response => { // Then we handle the promise with the .then method. and to actually read the data from the response we need to use the response.json() to actually get the data and this also becomes another whole promise so we have to handle it with the another .then and in it we get the actual data.
//    console.log(response);
//    return response.json(); // This gives us a new promise. and it contains the actual data. so we have to call another .then on it so we can use the data came from fetch and the promise.
//  }).then(data => {
//    console.log(data);
//    renderCountry(data[0]);
//  })
// };
//////////////////////////////////////////////////////////////
// Chaining promises.
console.log("---Chaining promises---");
// const getCountryData = function(country){
//   // country 1
//  fetch(`https://restcountries.com/v2/name/${country}`) 
//  .then(response => response.json())
//  .then(data => {
//      renderCountry(data[0]);
//      const neighbour = data[0].borders?.[0];

//      if(!neighbour) return;

//      // Country 2
//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    
//     // (fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//     // .then(response => response.json())
//     //  .then(data => renderCountry(data,"neighbour"))
//     // Dont do this cause this again lead to the callback hell.)
//   })
//      .then(response => response.json())
//      .then(data => renderCountry(data,"neighbour"))
// };
// // getCountryData("portugal");
// getCountryData("usa");

// Handling Rejected Promises
console.log("---Handling Rejected Promises---");

const getJSON = function(url,errorMsg ="Something went wrong"){
 return fetch(url)
  .then( response => {
     if(!response.ok)
    throw new Error(`${errorMsg} (${response.status})`)

    return response.json()
})
}

// const getCountryData = function(country){
//   // country 1
//  fetch(`https://restcountries.com/v2/name/${country}`) 
//  .then(response => {
//   if(!response.ok)
//     throw new Error(`Country not found (${response.status})`)

//   return response.json()

//   }/*,  err => alert(err)*/) // First way to handle the error.
//  .then(data => {
//      renderCountry(data[0]);
//     //  const neighbour = data[0].borders?.[0];
//     const neighbour = "dfg";

//      if(!neighbour) return;
//      // Country 2
//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    
//     // fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//     // .then(response => response.json())
//     //  .then(data => renderCountry(data,"neighbour"))
//     // Dont do this cause this again lead to the callback hell.
//   })
//      .then(response => {
//        if(!response.ok)
//         throw new Error(`Neighbouring Country not found (${response.status})`)
      
//       return response.json()}/*,  err => alert(err)*/) // First way to handle the error.)
//      .then(data => renderCountry(data,"neighbour"))
//      .catch(err => {
//       console.error(`${err} BOOM`)
//       renderError(`Something went wrong... ${err.message}. Try again!`)
//     })
//     .finally(()=>{
//        countriesContainer.style.opacity = 1;
//     })
//   };

// btn.addEventListener("click",function(){
//   getCountryData("usa");
//   // getCountryData("portugal");
// });

// Throwing Errors Manually
console.log("---Throwing Errors Manually--");

// const getJSON = function(url,errorMsg ="Something went wrong"){
//  return fetch(url)
//   .then( response => {
//      if(!response.ok)
//     throw new Error(`${errorMsg} (${response.status})`)

//     return response.json()
// })
// }

// const getCountryData = function(country){
//   // country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
//  .then(data => {
//      renderCountry(data[0]);
//      const neighbour = data[0].borders?.[0];
//     // const neighbour = "dfg";

//      if(!neighbour) 
//       throw new Error("No neighbour found!")
//      // Country 2
//     return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `Neighbouring Country not found`)
 
//   })
//      .then(data => renderCountry(data,"neighbour"))
//      .catch(err => {
//       console.error(`${err} BOOM`)
//       renderError(`Something went wrong... ${err.message}. Try again!`)
//     })
//     .finally(()=>{
//        countriesContainer.style.opacity = 1;
//     })
//   };

// btn.addEventListener("click",function(){
//   getCountryData("portugal");
//   // getCountryData("iceland");
// });
// getCountryData("dfg")

// CHALLENGE #1
console.log("---CHALLENGE #1---");

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function(lat,lng){
//   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//   .then(response => {
//     if(!response.ok) 
//       throw new Error(`Problem with geocoding ${response.status}`)
//     return response.json()
//   })
//   .then(data => {
//     // console.log(data)
//     // console.log(data.city);
//     const city = data.city;
//     const code = data.countryCode;

//     console.log(`You are in ${city}, ${data.countryName}`);

//     return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
//   }).then(res => {
//       if(!res.ok) 
//         throw new Error(`country not found (${res.status})`)
//       return res.json();
//     })
//     .then(data =>renderCountry(data[0]))
//     .catch(err=>console.log(`${err.message}`))
// }

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(-33.933, 13458.474);

///////////////////////////////////////////////////////////////////

// Asynchronous Behind the Scenes: The Event Loop
console.log("---Asynchronous Behind the Scenes: The Event Loop---");
// Theory

// The Event Loop in Practice
// console.log("---The Event Loop in Practice--");

// console.log("test start");
// setTimeout(()=>console.log("0 sec timer"),0);
// Promise.resolve("resolved promise 1").then(res => console.log(res));

// Promise.resolve("resolved promise 2").then(res=>{
//   // for(let i =0; i< 10000000000; i++){}
//   console.log(res)
// })
// console.log("test end"); 

// OUTPUT order:-
// test start
// test end
// resolved promise 1
// 0 sec timer

//  Building a Simple Promise
console.log("--- Building a Simple Promise---");

// const lotteryPromise = new Promise(function(resolve,reject){
  
//   console.log("lottery draw is happening");
//   setTimeout(function(){
//     if(Math.random() >= 0.5){
//       resolve("you WIN");
//     } else{
//       // reject(new Error("you LOSE"));
//       reject("you LOSE");
//     }
//   },5000)

// });

// lotteryPromise
// .then(res=>console.log(res))
// .catch(err => console.log(err))
// .catch(err => console.error(err));

// Promisifying setTimeout.
console.log("---Promisifying setTimeout---");
// const wait = function(seconds){
//   return new Promise(resolve=>{
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
// .then(()=>{
//   console.log("1 seconds passed");
//   return wait(1);
// })
// .then(()=>{
//   console.log("2 seconds passed");
//   return wait(1);
// })
// .then(()=>{
//   console.log("3 seconds passed");
//   return wait(1);
// })
// .then(()=>{
//   console.log("4 seconds passed");
// })

// Promise.resolve("abcd").then(x=>console.log(x));
// Promise.reject(new Error("Problem!")).catch(x=>console.error(x));

// Promisifying the Geolocation API
console.log("---Promisifying the Geolocation API---");

// const getPosition = function(){
//   return new Promise((resolve,reject)=>{
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), 
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve,
//       reject); // This is the same as the above.
//   });
// };

// getPosition()
// .then(pos => console.log(pos))
// .catch(err => console.log(err))

////////////////////////////////////////////

// const whereAmI = function(){

//   getPosition().then(pos => {
//     const {latitude:lat,longitude:lng} = pos.coords;
//     return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//   })
//   .then(response => {
//     if(!response.ok) 
//       throw new Error(`Problem with geocoding ${response.status}`)
//     return response.json()
//   })
//   .then(data => {
//     // console.log(data)
//     // console.log(data.city);
//     const city = data.city;
//     const code = data.countryCode;

//     console.log(`You are in ${city}, ${data.countryName}`);

//     return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
//   }).then(res => {
//       if(!res.ok) 
//         throw new Error(`country not found (${res.status})`)
//       return res.json();
//     })
//     .then(data =>renderCountry(data[0]))
//     .catch(err=>console.log(`${err.message}`))
// }

// btn.addEventListener("click",whereAmI);

// CHALLENGE #2
console.log("---CHALLENGE #2---");

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imageContainer = document.querySelector(".images");

// const createImage = function(path){
//   return new Promise((resolve,reject)=>{
//     const img = document.createElement("img");
//     img.src = path;
//     img.onload = () => resolve(img);
//     img.onerror = () => reject(new Error("Image failed to load"));
//   })
// }

// let currentImg;

// createImage("img/img-1.jpg")
// .then(img =>{
//   currentImg = img;
//   return wait(2);  
// })
// .then(() => {
//   imageContainer.append(currentImg);
//   return wait(2);
// })
// .then(()=>{
//   currentImg.style.display = "none";
//   return createImage("img/img-2.jpg");
// })
// .then(img=>{
//   currentImg = img;
//   return wait(2);
// })
// .then(()=>{
//   imageContainer.append(currentImg)
//   return wait(2);
// })
// .then(()=>{
//   currentImg.style.display = "none";
//   return createImage("img/img-3.jpg");
// })
// .then(img=>{
//   currentImg = img;
//   return wait(2);
// })
// .then(()=>{
//   imageContainer.append(currentImg)
//   return wait(2);
// })
// .then(()=>{
//   currentImg.style.display = "none";
// })
// .catch(err => console.log(err));

//////////////////////////////////////////////////////////

// Consuming Promises with Async/Await
console.log("---Consuming Promises with Async/Await---");

// const getPosition = function(){
//   return new Promise((resolve,reject)=>{
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), 
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve,
//       reject); // This is the same as the above.
//   });
// };

// const whereAmI2 = async function(country){
//   try{
//   // Geolocation
//   const pos = await getPosition();
//   // console.log(pos);
//   const {latitude:lat,longitude:lng} = pos.coords;

//   // Reverse Geocoding
//   const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
//   if(!resGeo.ok) throw new Error("Problem getting location data");

//   const dataGeo = await resGeo.json();
//   // console.log(dataGeo);
//   const countryName = dataGeo.countryName; 

//   // Country data
//  const res = await fetch(`https://restcountries.com/v2/name/${country || countryName}`);
//  if(!res.ok) throw new Error("Problem getting country");

//   //  console.log(res);
//   const [data] = await res.json();
//   //  console.log("2: getting location");
//   //  console.log(data);
//   renderCountry(data);

//   return `You are in ${dataGeo.city}, ${countryName}`
//   }
//   catch(err){
//   console.error(err);
//   renderError(`Something went wrong, ${err}`);

//   // Reject promise retured from the async function.
//   throw err;
//   }
// }
// console.log("1: Will get location");

// const city = whereAmI2("usa");
// console.log(city);

// whereAmI2()
// .then(city=>console.log(city))
// .catch(err => console.error(`2: ${err}`))
// .finally(()=> console.log("3: finished getting location"))

// Here is the use of IIFE (immediately invoked function expression).
// (async function(){
//   try{
//    const city = await whereAmI2("usa");
//    console.log(city)
//   }catch(err){
//     console.error(`2: ${err}`)
//   } 
//   console.log("3: finished getting location")
// })();

// console.log("FIRST"); // This shows first in the console even when defined after the function call, this is because the function is a asynchronous function.

// Error Handling With try...catch
console.log("---Error Handling With try...catch---");

// try{
//   let y = 1;
//   const x = 2;
//   x = 3;
// }
// catch(err){
//   console.error(err)
// }

// applied this in the above example..

// Returning Values from Async Functions
console.log("---Returning Values from Async Functions--");

// Shown completely above.

// Running Promises in Parallel
console.log("---Running Promises in Parallel---");
// const get3Countries = async function(c1,c2,c3){
//   try{
  //  const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
  //  const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
  //  const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
  // console.log([data1.capital,data2.capital,data3.capital]);

// const data = await Promise.all(
//   [getJSON(`https://restcountries.com/v2/name/${c1}`),
//    getJSON(`https://restcountries.com/v2/name/${c2}`),
//    getJSON(`https://restcountries.com/v2/name/${c3}`)]);

//    console.log(data);
//    console.log(data.map(d => d[0].capital));

//   }catch(err){
//     console.log(err);
//   }
// };
// get3Countries("portugal","canada","usa");

// Other Promise Combinators: race, allSettled and any.
console.log("---Other Promise Combinators: race, allSettled and any---");

// Promise.race().
// (async function(){
//  const res = await Promise.race([
//   getJSON(`https://restcountries.com/v2/name/portugal`),
//   getJSON(`https://restcountries.com/v2/name/italy`),
//   getJSON(`https://restcountries.com/v2/name/usa`)
// ])
// console.log(res[0]);
// })();
// //
// const timeout = function(sec){
//   return new Promise((_,reject) => {
//     setTimeout(()=>{
//       reject(new Error("request took too long.."))
//     }, sec * 1000)
//   })
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/egypt`),timeout(5)
// ]).then(res => console.log(res[0])).catch(err => console.error(err));

// Promise.allSettled().
// Promise.allSettled([
//   Promise.resolve("success"), 
//   Promise.reject("rejected"),
//   getJSON(`https://restcountries.com/v2/name/egypt`),
//   timeout(2)
// ]).then(res => console.log(res));

// Same with the Promise.all().
// Promise.all([
//   Promise.resolve("success"), 
//   Promise.reject("rejected"),
//   getJSON(`https://restcountries.com/v2/name/egypt`),
//   timeout(2)
// ]).then(res => console.log(res))
// .catch(err => console.error(err))

// Promise.any().
// Promise.any([
//   getJSON(`https://restcountries.com/v2/name/egypt`),
//   Promise.resolve("success"), 
//   Promise.reject("rejected"),
//   timeout(2)
// ]).then(res => console.log(res))
// .catch(err => console.error(err))

// CHALLENGE #3
console.log("---CHALLENGE #3---");

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imageContainer = document.querySelector(".images");

// const createImage = async function(path){
//   return new Promise((resolve,reject)=>{
//     const img = document.createElement("img");
//     img.src = path;
    
//     img.addEventListener("load",function(){
//       imageContainer.append(img);
//       resolve(img);
//     })
    
//     img.addEventListener("error",function(){
//       reject(new Error("Image did not load!!!"));
//     })
//   })
// }

// // Part 1.
// const loadNPause = async function(){
//   try{
//     // load img 1
//     let img = await createImage("img/img-1.jpg");
//     console.log("Image 1 loaded");
//     await wait(2);
//     img.style.display = "none";
//     await wait(2);
    
//     // load img 2
//     img = await createImage("img/img-2.jpg");
//     console.log("Image 2 loaded");
//     await wait(2);
//     img.style.display = "none";
//     await wait(2);
    
//     // load img 3
//     img = await createImage("img/img-3.jpg");
//     console.log("Image 3 loaded");
//     await wait(2);
//     img.style.display = "none";
    
//   }catch(err){
//     console.error(err);
//   }
// }

// // loadNPause()

// // Part 2.
// const imgArr = ["img/img-1.jpg","img/img-2.jpg","img/img-3.jpg"];

// const loadAll = async function(imgArr){
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     console.log(imgs);

//    const imgsEl = await Promise.all(imgs);
//    console.log(imgsEl);

//    imgsEl.forEach(img => img.classList.add("parallel"));
   
//   } catch (error) {
//     console.error(error);
//   }
// };

// loadAll(imgArr);

////////////////////////////////////////////////////////////////