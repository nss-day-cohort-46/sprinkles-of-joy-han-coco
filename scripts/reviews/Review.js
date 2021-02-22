import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { deleteReview, useReviews } from "./ReviewProvider.js"

const eventHub = document.querySelector('#container')
const reviewModalElement = document.querySelector('.productReview')

const reviewStars = [
    "",
    "⭐️",
    "⭐️⭐️",
    "⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️⭐️"
]


export const Review = (reviewWithCustomer) => {
    return `
    <div class="review">
        <p class="review__rating" id="review__rating--${reviewWithCustomer.review.id}">${reviewStars[reviewWithCustomer.review.rating]}</p>
        <strong>
            <p class="review__name">${reviewWithCustomer.customer.name}</p>
        </strong>
    </div>
    `
}

eventHub.addEventListener("click", e => {
    if (e.target.id.includes("review__rating--")) {
        const id = parseInt(e.target.id.split("--")[1])
        const reviews = useReviews()
        const review = reviews.find(r => r.id === id)
        reviewModal(review)
    }
})
