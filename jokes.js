const URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
let told = []
const joke1 = document.getElementById('joke1')
const joke2 = document.getElementById('joke2')

/**
 * Gets a random joke from the API and displays it after checking it hasn't been told recently.
 */
async function logJoke() {
  const response = await fetch(URL)
  const data = await response.json()
  if (told.includes(data.id)) {
    logJoke()
  }
  else {
    if (data.joke) {
      console.log(data.joke)
      joke1.innerHTML = ""
      joke2.innerHTML = data.joke
      checkTold(data)
    }
    else if (data.setup) {
      console.log(data.setup)
      console.log(data.delivery)
      joke1.innerHTML = data.setup
      joke2.innerHTML = data.delivery
      checkTold(data)
    }
    else {console.log("Error: Joke not found")
    joke1.innerHTML = "Error:"
    joke2.innerHTML = "Joke not found."
    }
  }
}

/**
 * Adds the told joke ID to an array to avoid retelling the same joke within 10 jokes.
 * @param {*} data
 */
function checkTold(data) {
  told.push(data.id)
  if (told.length > 10) {
    told.shift()
  }
  console.log(told)
}



logJoke()