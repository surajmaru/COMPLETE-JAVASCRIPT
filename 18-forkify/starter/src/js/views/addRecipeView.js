import View from "./view.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
    _parentElement = document.querySelector(".upload");
    _message = "Recipe was successfully uploaded!!!"

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    ingForm = document.querySelectorAll(".ing");
    errorMsg = document.querySelector(".message__form");
    urlForm = document.querySelectorAll(".url");
    
    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    };
    
    toggleWindow(){
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    };
    
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    };
    
    _addHandlerHideWindow(){
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    };
    
    addHAndlerUpload(handler){
        this._parentElement.addEventListener("submit",function(e){
            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);
            // console.log(data);
            // console.log(data.title);
            handler(data);

        });
    };

    formCheck(){
        // console.log(this.ingForm);
        this.ingForm.forEach(ing => {
            // console.log(ing);
            const wrapper = ing.parentElement;

            const msg = document.createElement("p");
            msg.className = "message__form hide";
            msg.innerText = "Format: quantity,unit,item"
            // msg.style.position = "relative"
            // msg.style.left = "-110px"
            // ing.insertAdjacentElement("afterend", msg);
            wrapper.appendChild(msg);

            ing.addEventListener("input", (e)=>{
            const value = e.target.value;
            const commaCount = (value.match(/,/g) || []).length;

            if(commaCount !== 2){
                msg.classList.remove("hide");
                
            } else{
                msg.classList.add("hide");
            }
        });

        });

        // console.log(this.urlForm[0]);
        const wrapper = this.urlForm[0].parentElement;
        const msg = document.createElement("p");
        msg.className = "message__form hide";
        msg.innerText = "Must contain 5 characters"
        // msg.style.width = "180px"
        wrapper.appendChild(msg);
        this.urlForm[0].addEventListener("input", ()=>{
            const value = this.urlForm[0].value;
            if(value.length < 5){
                msg.classList.remove("hide");
            }else{
                msg.classList.add("hide");
            }
            
        })

    };

};

export default new AddRecipeView();