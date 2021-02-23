import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

// fixed variable naming 
let customerOrders = []

export const useOrders = () => orders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      customerOrders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json()) // gets the object that was saved
    .then( createdOrder => {         // createdOrder is now the the order object that was gets saved
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createdOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}



// debugger
export const deleteOrder = (orderObj) => {
  return fetch(`${bakeryAPI.baseURL}/orders/${orderObj.id}`, {
    method: "DELETE"
  })
  .then(getOrders)
  .then(dispatchStateChangeEvent)
}