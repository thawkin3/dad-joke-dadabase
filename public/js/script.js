const jokeContent = document.querySelector('.jokeContent');
const jokeRatingValue = document.querySelector('.jokeRatingValue');
const nextJokeButton = document.querySelector('#nextJoke');

const jokes = [];
let currentJokeIndex = -1;

const displayNextJoke = () => {
  console.log('currentJokeIndex BEFORE displaying new joke', currentJokeIndex);
  currentJokeIndex++
  if (currentJokeIndex >= jokes.length) {
    currentJokeIndex = 0;
  }
  console.log('currentJokeIndex AFTER displaying new joke', currentJokeIndex);


  const joke = jokes[currentJokeIndex];

  jokeContent.textContent = joke.content;

  const totalScore = joke.ratings.reduce((total, rating) => total += rating.score, 0)
  const numberOfRatings = joke.ratings.length;
  const averageRating = totalScore / numberOfRatings;

  jokeRatingValue.textContent = averageRating.toFixed(1);
}

const submitJokeRating = () => {
  const ratingInput = document.querySelector('input[name="yourRating"]:checked');

  if (ratingInput && ratingInput.value) {
    const score = Number(ratingInput.value);
    const jokeId = jokes[currentJokeIndex].id;
    const postData = { jokeId, score };
    console.log('currentJokeIndex', currentJokeIndex, 'joke your are rating', postData);

    fetch('/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('response received', responseData)
        const jokeToUpdate = jokes.find(joke => joke.id === responseData.jokeId);
        jokeToUpdate && jokeToUpdate.ratings.push(responseData)
      })
      .finally(() => {
        ratingInput.checked = false;
        displayNextJoke();
      })
  } else {
    displayNextJoke()
  }
}

nextJokeButton.addEventListener('click', submitJokeRating);

fetch('/jokes?_embed=ratings')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    jokes.push(...data);
    displayNextJoke();
  });
