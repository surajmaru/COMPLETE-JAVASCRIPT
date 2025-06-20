'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

const openModal = function(){

        console.log("Button clicked");
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal );


const closeModal = ()=>{
        modal.classList.add("hidden");
                overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);//this is correct.
// btnCloseModal.addEventListener("click", closeModal());//not this.
overlay.addEventListener("click", closeModal);//declare/define the function.
// overlay.addEventListener("click", closeModal());//calling the function.


document.addEventListener("keydown",(e)=>{
console.log(e.key);//because the "(e)event" is an object.

//old version.
// if(e.key === "Escape"){
//     if(!modal.classList.contains("hidden")){
//         closeModal();//here we have to actually call the function.
//     }
// }});

//optimised version.
if(e.key === "Escape" && !modal.classList.contains("hidden") ){

        closeModal();//here we have to actually call the function.

}});