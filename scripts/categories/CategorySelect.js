import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")
// a reference to the DOM element where the code will be rendered ^

let categories = []

export const CategorySelect = () => {
  // fetching the API and loading it into application state
  getCategories()
  // get the data ^
  // added missing .then
  .then(() => {
    categories = useCategories()
    // get a copy of the data ^
    render()
    // render the data to the dom ^
    // console.log(render)
  })
  
}

const render = () => {
  // html was lowercased in inner.HTML
  contentTarget.innerHTML = `
  
      <select class="dropdown" id="categorySelect">
          <option value="0">All baked goods...</option>
          ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}

      </select>
      
      <button id="reviewsList">
          <option value="0">Place a Review..</option>
          <input class="review" id="review" type="review">
          
          </input>
          
      </button>
     
  `
} 

// 

eventHub.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "categorySelect") {
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        // parseInt so that when you render the number into a string
        selectedCategory: parseInt(changeEvent.target.value)
      }
    })
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})
