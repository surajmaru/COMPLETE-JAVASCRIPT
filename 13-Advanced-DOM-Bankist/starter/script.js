'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // this is because when we clicked on th open account button it would pop to the top, the window so to prevent that we used this. It was because of the link and hyperlink used in the html of that button.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// Better way.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////
// Selecting, Creating, and Deleting Elements
console.log("---Selecting, Creating, and Deleting Elements---");


//selecting elements.
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// document.getElementById("section--1");
// const allBtns = document.getElementsByTagName("button");
// console.log(allBtns);

// const btn = document.getElementsByClassName("btn");
// console.log(btn);

// creating and inserting elements.
// .insertAdjacentHTML 
// this is a quick and easy way to change the html.

// const message = document.createElement("div"); // This element does not exists in our DOM, its just a dom object which we can used so something with it.
// message.classList.add("cookie-message");
// message.textContent = "we use cookies for improved functionalities";
// message.innerHTML = 'we use cookies for improved functionalities. <button class="btn btn--closed-cookie">Got it!</button>';

// // header.prepend(message); // message becomes the first child of the header
// header.append(message); // message becomes the last child of the header
// // And it cannot be at the multiple places at once.

// // header.append(message.cloneNode(true)); // here we copied and placed on the bottom too.

// // header.before(message);
// // header.after(message);

// // Delete elements.
// document.querySelector(".btn--closed-cookie").addEventListener("click",function(){
//   message.remove(); // new method.
//   // message.parentElement.removeChild(message); //old way.
// });

// //
// //Styles, Attributes and Classes
console.log("---Styles, Attributes and Classes---");

// // Styles.
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// console.log(message.style.height);
// console.log(message.style.backgroundColor); // we can do this only with the inline styles and not with the styles thats hidden inside a class or if it doesnt even exists.

// // We can still get the styles but we have to use the method.
// console.log(getComputedStyle(message).height); // Like this.
// console.log(getComputedStyle(message).color); // even its not defined then also the browser calculates it and gives it to us.

// const a = message.style.height  = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"; 
// console.log(a);


// setProperty.
// document.documentElement.style.setProperty("--color-primary", "orange");

// // Attributes.
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);


// logo.alt = "Beautiful minimalist logo"

// // Non - standard
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "Bankist");

// console.log(logo.src); // Absolute version.
// console.log(logo.getAttribute("src")); // Relative version.

// const link  = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("href"));

// // Data attributes.
// console.log(logo.dataset.versionNumber);


// // Classes.
// logo.classList.add("c", "s");
// logo.classList.remove("c","s");
// logo.classList.toggle("c");
// logo.classList.contains("c"); // here is contains and not "includes".

// // dont use this because this will overwrite all the existing classes.
// logo.className = "suraj";

//Implementing Smooth Scrolling
console.log("---Implementing Smooth Scrolling---");

btnScrollTo.addEventListener("click",function(e){
  
  //1st way.
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Crrent Scroll (X/Y)", window.pageXOffset,window.pageYOffset);

  // console.log("height/width", document.documentElement.clientHeight,document.documentElement.clientWidth);

  // Scrolling.
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // we can add properties by making it as object.
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth"
  // });

  //2nd way better method.
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//types of Events and Event Handlers
console.log("---types of Events and Event Handlers---");

//new way
// const h1 = document.querySelector("h1");

// const alertH1 = function(e){
//   alert("addEventListener: Great!"); // When we hover over the h1 then we get that message.
// }
// h1.addEventListener("mouseenter", alertH1 );

// setTimeout(()=>h1.removeEventListener("mouseenter", alertH1),3000);


// //old way
// h1.onmouseenter = function(e){
//   alert("addEventListener: Great job!"); // When we hover over the h1 then we get that message.
// };

//Event Propagation: Bubbling and Capturing
console.log("---Event Propagation: Bubbling and Capturing---");

console.log("---Event Propagation in Practice---");

// //To egenrate random rumber between TWO numbers.
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

// // To generate a random color.
// const randomColor = ()=> `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
// // console.log(randomColor());

// // This is a pure example for the event Event Propagation: Bubbling and Capturing.
// document.querySelector(".nav__link").addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   console.log("LINK",e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propogation.
//   // e.stopPropagation(); // By this the two parent will not change their background also, only this element will change.
// });

// document.querySelector(".nav__links").addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER",e.target,e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// document.querySelector(".nav").addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   console.log("NAV",e.target,e.currentTarget);
//   console.log(e.currentTarget === this);
// }, false);

//Event Delegation: Implementing Page Navigation
console.log("---Event Delegation: Implementing Page Navigation---");

// document.querySelectorAll(".nav__link").forEach(function(el){
//   el.addEventListener("click",function(e){
//     e.preventDefault();

//     const id = this.getAttribute("href");

//     console.log(id);

//     document.querySelector(id).scrollIntoView({behavior:"smooth"});
//   });
// }); // This way is fine but what if we have like 1000 elements in the section and we just wanted to loop over 3 or 4 elements so it would be a waste of memory and performance.

///////////////////////////////////////////////////////////////
// Therefore we use Event Delegation.
// Event Delegation.
// 1. Add event Listener to common parent element.
// 2. Determine what element originated that event.

document.querySelector(".nav__links").addEventListener("click",function(e){
  e.preventDefault();
  console.log(e.target);

  // Matching strategy. Selecting the specific elements.
  if(e.target.classList.contains("nav__link")){

    console.log("LINK");
    
    const id = e.target.getAttribute("href");

    console.log(id);

    document.querySelector(id).scrollIntoView({behavior:"smooth"});
  };

});