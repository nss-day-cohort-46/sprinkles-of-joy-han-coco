// this component exports a useProducts and getProducts method

import { bakeryAPI } from "../Settings.js"

let products = []

export const useProducts = () => products.slice()
// created a copy of the products array

export const getProducts = () => {
  return fetch(`${bakeryAPI.baseURL}/products`)
  // fetch() gets the data for us
    .then(response => response.json())
    // parse through the response 
    .then(bakedGoods => {
      // put the parsed response in products variable 
      products = bakedGoods
    })
}
