import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";
import "core-js/stable"; // For polyfilling everything else.
import "regenerator-runtime/runtime"; // For polyfilling async/await
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// if(module.hot){
//   module.hot.accept();
// } 
// Because of this, when we save we can see the page doesnt reloads. And the state remains.(only when i save the code here and its connected to live server or parcel).
// ( when we manually reload the browser then it obvously reloads )


// function
const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1); // For taking the id out of the url.
    // console.log(id);

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

  const controlSearchResults = async function(){

  try{
    ResultsView.renderSpinner();

    // 1: Get search query.
    const query = searchView.getQuery();
    if(!query) return;

    // 2: load search.
    await model.loadSearchResults(query);

    // 3: Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4: render initial pagination buttons
    paginationView.render(model.state.search);
    } catch(err){
    console.log(err);
  }};

  const controlPagination = function(gotoPage){
    // 3: Render new results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(gotoPage));

    // 4: render new pagination buttons
    paginationView.render(model.state.search);
  };

  const controlServings = function(newServings){
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
  }

  // Punlisher Subscriber
  const init = function(){
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
  };
init();