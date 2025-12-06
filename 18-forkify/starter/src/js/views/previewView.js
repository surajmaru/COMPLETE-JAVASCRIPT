import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PreveiwView extends View {
    _parentElement = "";

    _generateMarkup(){
      const id = window.location.hash.slice(1);
        // console.log(this._data);
        // Here because of the hash id, whenever we click on the item then the hash chnages in the window and the recipe is loaded according to it.
         return `
            <li class="preview">
            <a class="preview__link ${this._data.id === id ? "preview__link--active" : ""}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
          </li>
        `;
    };
};

export default new PreveiwView();