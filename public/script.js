const jokeContent = document.querySelector('.jokeContent')
const jokeRatingValue = document.querySelector('.jokeRatingValue')
const nextJokeButton = document.querySelector('#nextJoke')

const jokes = []
let currentJokeIndex = -1

const displayNextJoke = () => {
  currentJokeIndex++
  if (currentJokeIndex >= jokes.length) {
    currentJokeIndex = 0
  }

  const joke = jokes[currentJokeIndex]

  jokeContent.textContent = joke.content

  const totalScore = joke.ratings.reduce(
    (total, rating) => (total += rating.score),
    0
  )
  const numberOfRatings = joke.ratings.length
  const averageRating = totalScore / numberOfRatings

  jokeRatingValue.textContent = averageRating.toFixed(1)
}

const submitJokeRating = () => {
  const ratingInput = document.querySelector('input[name="yourRating"]:checked')

  if (ratingInput && ratingInput.value) {
    const score = Number(ratingInput.value)
    const jokeId = jokes[currentJokeIndex].id

    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        mutation CreateRating {
          rating(jokeId: ${jokeId}, score: ${score}) {
            id
            score
            jokeId
          }
        }
      `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        const rating = res.data.rating
        const jokeToUpdate = jokes.find(joke => joke.id === rating.jokeId)
        jokeToUpdate && jokeToUpdate.ratings.push(rating)
      })
      .finally(() => {
        ratingInput.checked = false
        displayNextJoke()
      })
  } else {
    displayNextJoke()
  }
}

nextJokeButton.addEventListener('click', submitJokeRating)

fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
    query GetAllJokesWithRatings {
      jokes {
        id
        content
        ratings {
          score
          id
          jokeId
        }
      }
    }
  `,
  }),
})
  .then(res => res.json())
  .then(res => {
    jokes.push(...res.data.jokes)
    displayNextJoke()
  })
