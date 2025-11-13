'use strict';


// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

//  https://countries-api-836d.onrender.com/countries/ 

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const getCountryAndNeighbour = function(country){

    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open("GET",`https://restcountries.com/v2/name/${country}`,true);
    request.send();

    request.addEventListener("load",function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);

    // Get neighbour country (2).
    const [neighbour] = data.borders;
    if(!neighbour) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET",`https://restcountries.com/v2/alpha/${neighbour}`,true);
    request2.send();

    request2.addEventListener("load",function(){
    const data2 = JSON.parse(this.responseText);
    console.log(data2);
    // Render country 2
    renderCountry(data2, "neighbour");
    })
});
};
// Here is a callback inside the callback, and what if we what the neightbour of the neightbour of the neighbour of the country then it would be a mess.
// so it would be callback inside callback inside callback....
// So this is called as "callback hell".

// getCountryAndNeighbour("portugal");
getCountryAndNeighbour("usa");

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