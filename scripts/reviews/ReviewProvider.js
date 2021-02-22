import { bakeryAPI } from "../Settings.js"

const eventHub = document.querySelector("#container")

let reviews = []

export const useReviews = () => {
   return reviews.slice()
}

 
    

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/reviews`)
    .then(response => response.json())
    .then(reviewsArray => {
      reviews = reviewsArray
    })
}


// this function saves your review and post it into the API
export const saveReview = review => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    .then( ProductList() )
}

export const deleteReview = reviewId => {
    return fetch(`${bakeryAPI.baseURL}/reviews/${reviewId}`, {
        method: "DELETE"
    })
        .then(getReviews)
        .then( ProductList() )
}

export const getReviewById = (reviewId) => {

    return reviews.find(r => r.id === reviewId)
  }