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
      console.log(err);
    }
};
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);

["hashchange", "load"].forEach(ev => window.addEventListener(ev, controlRecipes));
// This is exactly like above but better.