import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try{
    const data = await getJSON(`${API_URL}/${id}`);
    
    const {recipe} = data.data; // Creating a new object from the apis object for our better understanding.
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
        
    };
    // console.log(data.data.recipe);
    console.log(state.recipe);
    } catch(err){
        // Temp error handling
        console.log(`${err}💥💥💥`);
        throw err;
        
    }
}