import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
// imported reviews/customers
import { getReviews, useReviews } from "../reviews/ReviewProvider.js"
import { getCustomers, useCustomers } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []
let reviews = []


export const ProductList = () => {
  getProducts()
    .then(getCategories)

    .then(getReviews)
    .then(getCustomers)
    .then( () => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      reviews = useReviews()
      render(bakeryProducts, bakeryCategories)
    })
    
}

const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    // cat.id was the bug, category.id is the fix
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)
    // const productReviews = reviews.filter(review => review.productId === product.id)

    return Product(product, productCategory, reviews)
  }).join("")
}


// figured out that i needed something to listen for when i actually picked an option
// // listen for the category selection, then filter the products by selection
eventHub.addEventListener("categorySelected", event => {


  if(event.detail.selectedCategory > 0) {
    
    // selectedCategory = event.detail.selectedCategory
    // bakeryProducts & bakeryCategories are empty arrays that will be filled with data after the filter/find methhods are used and then re assigned to filteredProducts & productCategory which will be only activated upon someone actually clicking an option on the drop down
    const filteredProducts = bakeryProducts.filter(prod => prod.categoryId === event.detail.selectedCategory)
    const productCategory = bakeryCategories.find(cat => cat.id === event.detail.selectedCategory)

    contentTarget.innerHTML = filteredProducts.map(prod => Product(prod, productCategory)).join("")} 
    else {
    contentTarget.innerHTML = ProductList()
    // product list is already called in main, if not it will not render any of the products
  }

})