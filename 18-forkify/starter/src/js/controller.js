import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// import icons from "../img/icons.svg"; // For prev parcel version v1
// import icons from "url:../img/icons.svg"; // For latest..
import "core-js/stable"; // For polyfilling everything else.
import "regenerator-runtime/runtime"; // For polyfilling async/await

const recipeContainer = document.querySelector('.recipe');


// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// function
const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1); // For taking the id out of the url.
    console.log(id);

    if(!id) return; // Guard clause if theres no id on the url.
    recipeView.renderSpinner();

    // 1: loading recipe..
    await model.loadRecipe(id);

    // 2: rendering recipe..
    recipeView.render(model.state.recipe);
    }catch(err){
      recipeView.renderError();
    }
    // So the chain is like, in the recipeView.js we have a renderError method which just pushhes or just shows the error on the display, so we call that method here with passing the error.
    // Now,here as we are calling the loadRecipe function here, if theres an error in the loadRecipe funciton in the model.js then the promise returned from the function will still be resolved cause we were just console.logging it so here we would'nt trigger the catch block, so we manually throw the error in the loadRecipe function so the promise will be rejected and then here also we would get rejected promise so an error and that error will be catched here amd passed the error to the renderError method in the view(recipeView.js) and get displayed on the screen.
    // UPDATE:- now we dont pass anything into the renerError method because we manually have set the error as a private field in the recipeView file and we have directly passed that.
};

  const init = function(){
    recipeView.addHandlerRender(controlRecipes);
  };
init();