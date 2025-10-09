'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector(".nav");

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

//DOM Traversing
// console.log("---DOM Traversing---");

// const h1 = document.querySelector("h1");

// //Going downwards: selecting childs.
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "white";

// // Going upwards: selecting parents.
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";

// h1.closest("h1").style.background = "var(--gradient-primary)";

// //  Going sideways: selecting Siblings.
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el){
//   if(el !== h1){
//     el.style.transform = "scale(0.5)"
//   };
// });

//Building a Tabbed Component
console.log("---Building a Tabbed Component---");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach(t=>t.addEventListener("click",()=>console.log("TAB")));
// This here is a bad practice.

// We will use event Delegation instead.

tabsContainer.addEventListener("click",function(e){
  const clicked = e.target.closest(".operations__tab"); // We used this because we were getting error/mistake like we were getting diffrent element when clicked the number inside the button so we didnt want ed that so we goided that to the button itself and now when clicking on the button or the number we get the target of the button which we clicked on.
  console.log(clicked);

  // Guard clause.
  if(!clicked) return; // This is for if theres no clicked element, means like if we clicked outside the button but in that same section then we get an error cause we dont have or match anything with the class name ".operations__tab" so to fix that we return nothing like that.

  // To active the "operations__tab--active" on only at one and not other, so we firstly have to remove all the "operations__tab--active" from the button. Then we apply it to the button we clicked.
  tabs.forEach(t=> t.classList.remove("operations__tab--active"));
  tabsContent.forEach(c=>c.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");

  // Activate the content part.
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

//   Steps:

// Add event listener to the parent container

// Use e.target.closest() to find the actual clicked element

// Use a guard clause (if (!clicked) return;)

// Remove “active” classes from all elements

// Add “active” class to the clicked element and its matching content

});

//Passing Arguments to Event Handlers
console.log("---Passing Arguments to Event Handlers---");

// Top buttons fade animations.

const handleHover = function(e){
 if(e.target.classList.contains("nav__link")){
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      const logo = link.closest(".nav").querySelector("img");

      siblings.forEach(el => {if(el !== link) el.style.opacity = this});
      logo.style.opacity = this;
    };
}
// nav.addEventListener('mouseover',handleHover(e,0.5)); // This wont work.

// nav.addEventListener('mouseover',function(e){
//     handleHover(e,0.5);
// });

// nav.addEventListener('mouseout',function(e){
//    handleHover(e,1);
// });

// By using .bind
// Passing an "argument" into handler.
nav.addEventListener("mouseover",handleHover.bind(0.5));
nav.addEventListener("mouseout",handleHover.bind(1));

//Implementing a Sticky Navigation: The Scroll Event
console.log("---Implementing a Sticky Navigation: The Scroll Event---");
// This means the top navigation bar should be fixed when we scroll to top or bottom.

// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords);

// // But this "scroll" event here is a bad way/not a good way.
// window.addEventListener("scroll", function(){
//   // console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add("sticky")
//      else nav.classList.remove("sticky");
// });

//A Better Way: The Intersection Observer API
console.log("---A Better Way: The Intersection Observer API---");
// This api observes the element or the section changes relative to the viewport.

// const obsCallback = function(entries,observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0,0.2], // this value here states that, when it trigggers. means when "0" then it will trigger if the section1 is completely out of the viewport, and "0.2 or 0.3 .." means that 20% or 30% of the section1 visible or comes or goes out of the screen/viewport then it will trigger it.
// };

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav =  function(entries,observer){
  const [entry] = entries; // is same as entries[0];
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add("sticky");
  
    else nav.classList.remove("sticky");
  };

const headerObserver = new IntersectionObserver(stickyNav, {
  root:null,
  threshold: 0,
  // rootMargin: "-90px", // Manual way.
  rootMargin: `-${navHeight}px`, // This means that we are shifting the section line or the point where the function or the threshold activates so "-90" means -90px above the threshold point there it will be activated.
});
headerObserver.observe(header);

// Revealing Elements on Scroll
console.log("---Revealing Elements on Scroll---");

// So basically theres a class in all the sections 1 2 3 4 so it just hides the section by opacity: 0 and when we remove the class it translates itself a little to the y axis to give it a little animation while scrolling. 
// So now what we just have to remove that class while we scroll downwards to those sections and make them appear.


const allSections = document.querySelectorAll(".section");

const revealSection = function(entries,observer){
  // console.log(entries);
  // const [entry] = entries;
  entries.forEach(entry => {

    // console.log(entry);
    
    if(!entry.isIntersecting) return;
    
    entry.target.classList.remove("section--hidden");
    
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null, // viewport.
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading Images
console.log("---Lazy Loading Images---");

const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loadImg =  function(entries,observer){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;

  // Replace the src with data-src.
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function(){

    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
  
});

//Building a Slider Component: Part 1
console.log("---Building a Slider Component---");


const sliderFunc = function(){
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length - 1 ;

//Functions.
const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  // if the first slide is 0 then: -100%, 0%, 100%, 200%.
};

const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML("beforeend", 
      `
      <button class="dots__dot" data-slide="${i}"></button>
      `)
  });
};

const activateDot = function(slide){
  document.querySelectorAll(".dots__dot")
  .forEach(dot=> dot.classList.remove("dots__dot--active"));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add("dots__dot--active");
};

// Next slide.
const nextSlide = function(){
  
  if(currentSlide === maxSlide){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  
  goToSlide(currentSlide);
  // if the first slide is 1 then: -100%, 0%, 100%, 200%.
  activateDot(currentSlide);
};

const prevSlide = function(){
  if(currentSlide === 0){
    currentSlide = maxSlide;
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

// Eventhandlers.
btnRight.addEventListener("click",nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function(e){
  // console.log(e);
  if(e.key === "ArrowRight") nextSlide();
  // e.key === "ArrowRight" && nextSlide(); This will also work cause of short-circuiting.
  if(e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click",function(e){
  if(e.target.classList.contains("dots__dot")){
    const currentSlide = Number(e.target.dataset.slide);
    console.log(currentSlide);
    goToSlide(currentSlide);
    activateDot(currentSlide); 
  };
});

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);

}

init()
};

sliderFunc();
