const URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit' //Joke API with SFW filters.
let told = []   //List of told jokes.
const joke1 = document.getElementById('joke1')  //Gets HTML Element.
const joke2 = document.getElementById('joke2')  //Gets HTML Element

/**
 * Gets a random joke from the API and displays it after checking it hasn't been told recently.
 */
async function logJoke() {
  const response = await fetch(URL)       //Await API response.
  const data = await response.json()      //Asign API response to data.
  if (told.includes(data.id)) {           //If the joke was already told recently.
    logJoke()                             //Gets a new joke.
  }
  else {
    if (data.joke) {                      //Checks for single line joke
      joke1.innerHTML = ""                //Set line 1 to nothing.
      joke2.innerHTML = data.joke         //Set line 2 to the joke.
      checkTold(data)                     //Add joke to list told.
    }
    else if (data.setup) {                //Checks for two-line joke.
      joke1.innerHTML = data.setup        //Set line 1 to the joke setup.
      joke2.innerHTML = data.delivery     //Set line 2 to the joke delivery.
      checkTold(data)                     //Add joke to list told.
    }
    else {console.log("Error: Joke not found")
    joke1.innerHTML = "Error 404:"        //Set line 1 to Error code.
    joke2.innerHTML = "Joke not found."   //Set line 2 to Error description.
    }
  }
}

/**
 * Adds the told joke ID to an array to avoid retelling the same joke within 10 jokes.
 * @param {*} data
 */
function checkTold(data) {
  told.push(data.id)                      //Adds to array.
  if (told.length > 10) {                 //After 10 jokes:
    told.shift()                          //Removes first element.
  }
}


logJoke()                                 //Starts the Program.