import View from "./view.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = "No recipes found for your query! Please try again :)";
    _message = "";

    _generateMarkup(){
        // console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join("");
        // return this._data.map(res => this._generateMarkupPreview(res)).join(""); // Above one is the same as this one here.
       
    }
    _generateMarkupPreview(result){
      const id = window.location.hash.slice(1);
        // console.log(result);
        // Here because of the hash id, whenever we click on the item then the hash chnages in the window and the recipe is loaded according to it.
         return `
            <li class="preview">
            <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `
    };
};

export default new ResultsView();