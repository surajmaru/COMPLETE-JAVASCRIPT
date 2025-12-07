import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler){
        this._parentElement.addEventListener("click", function(e){
            const btn = e.target.closest(".btn--inline");

            if(!btn) return;
            // console.log(btn);

            const gotoPage = +btn.dataset.goto;
            // console.log(gotoPage);

            handler(gotoPage);
        })
    }

    _generateMarkup(){
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(curPage);
        // console.log(numPages);
        const totalResults = this._data.results.length
        // console.log(this._data.results.length);


        // Page 1 and there are other pages
        if(curPage === 1 && numPages > 1){
            return `
          <button class="btn--def">
          <span>Page 1</span>
          </button>
          
            <button class="btn--def">
          <span>${numPages} Pages & ${totalResults} Results</span>
          </button>

            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>

          `;
        }
        
        // Last page
        if(curPage === numPages && numPages > 1){
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>

            <button class="btn--def">
            <span>${numPages} Pages & ${totalResults} Results</span>
            </button>

            <button class="btn--def">
            <span>Page ${numPages}</span>
            </button>
            `;
        }
        
        // Other page
        if(curPage < numPages){
            return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>

              <button class="btn--def">
              <span>${numPages} Pages & ${totalResults} Results</span>
              </button>

          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }
        
        // Page 1 and there are NO other pages
        return ""
    }
};

export default new PaginationView();