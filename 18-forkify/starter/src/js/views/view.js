import icons from "url:../../img/icons.svg";

export default class View {
        _data;

        ////////////////////////////
        // How to write better js documentations.
        // This specifies docs about this method.
        /**
         * Render the received object to the DOM
         * @param {Object | Object[]} data The data to be rendered. (eg. recipe)
         * @param {boolean} [render=true] this is an optional parameter, If false create markup string instead of rendering to the DOM.
         * @returns {undefined | string} A markup is returned if render is false.
         * @this {Object} View object
         * @author Suraj Maru
         * @todo Finish implementation
         */
        render(data, render = true ){
            if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

            this._data = data;
            const markup = this._generateMarkup();

            if(!render) return markup;

            this._clear();
            this._parentElement.insertAdjacentHTML("afterbegin", markup);
 
        };

        // Developing a DOM Updating Algorithm
        update(data){
          
          this._data = data;
          const newMarkup = this._generateMarkup();

          const newDom = document.createRange().createContextualFragment(newMarkup);
          const newElements = Array.from(newDom.querySelectorAll("*"));
          const curElements = Array.from(this._parentElement.querySelectorAll("*"));
          // console.log(curElements);
          // console.log(newElements);

          // This is important here..
          newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));
            // We are comparing them both.
            // We are checking here that the array which contains the new dom and its elements are equal to the original unchanged dom. 
            // So we are just comparing the 2 doms new updated one and the old original one.
            // So if both the elements in both the doms are same (one by one checking) then it will give true and if some of the elements are not same then it will return false.
            // So on that basis we can figure out which element we have to update on the dom and not the whole html again. Only the changed one !

            // Updates changed text
            if(!newEl.isEqualNode(curEl) 
              && newEl.firstChild?.nodeValue.trim() !== ""){
              curEl.textContent = newEl.textContent;
            };

            // Update changed attributes
            if(!newEl.isEqualNode(curEl)){
              // console.log(newEl.attributes);
              // console.log(Array.from(newEl.attributes));
              Array.from(newEl.attributes).forEach(attr =>
               { 
                // console.log(attr)
                curEl.setAttribute(attr.name , attr.value)})
            };
          });
        };
        
        _clear(){
            this._parentElement.innerHTML = "";
        };
    
        
        // rendering the loading spinner..
        renderSpinner(){
            const markup = `
                <div class="spinner">
                    <svg>
                        <use href="${icons}#icon-loader"></use>
                    </svg>
                    </div>
            `;
            this._clear();
            this._parentElement.insertAdjacentHTML("afterbegin", markup);
        };
    
        
        renderError(message = this._errorMessage){
          const markup = `
          <div class="error">
          <div>
          <svg>
          <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${message}</p>
          </div>
          `;
          
          this._clear();
          this._parentElement.insertAdjacentHTML("afterbegin", markup);
        };
    
        renderMessage(message = this._message){
          const markup = `
            <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
          `;
    
          this._clear();
          this._parentElement.insertAdjacentHTML("afterbegin", markup);
        };
    
}