'use strict';

///////////////////////////////////////
// Modal window

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
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allBtns = document.getElementsByTagName("button");
console.log(allBtns);

const btn = document.getElementsByClassName("btn");
console.log(btn);

// creating and inserting elements.
// .insertAdjacentHTML 
// this is a quick and easy way to change the html.

const message = document.createElement("div"); // This element does not exists in our DOM, its just a dom object which we can used so something with it.
message.classList.add("cookie-message");
message.textContent = "we use cookies for improved functionalities";
message.innerHTML = 'we use cookies for improved functionalities. <button class="btn btn--closed-cookie">Got it!</button>';

// header.prepend(message); // message becomes the first child of the header
header.append(message); // message becomes the last child of the header
// And it cannot be at the multiple places at once.

// header.append(message.cloneNode(true)); // here we copied and placed on the bottom too.

// header.before(message);
// header.after(message);

// Delete elements.
document.querySelector(".btn--closed-cookie").addEventListener("click",function(){
  message.remove(); // new method.
  // message.parentElement.removeChild(message); //old way.
});

//
