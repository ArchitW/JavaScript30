const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
// The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used `XMLHttpRequest`, but the new API provides a more powerful and flexible feature set.
// `fetch()` allows you to make network requests similar to `XMLHttpRequest` (XHR). The main difference is that the Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and having to remember the complex API of `XMLHttpRequest`.
// `fetch()` returns a Promise that resolves to the Response to that request, whether it is successful or not.
// The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
// The `then()` method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
fetch(endpoint)
  // `blob` contains a response with `type`,`url`,`status` etc...
  // The `json()` method of the `blob` takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the `blob` as JSON.
  .then(blob => console.log(blob) || blob.json())
  // After `blob.json()` we get another promise so we again are using `.then` method.
  // `data` is the result of the previous `then`
  // To the array `cities` we are pushing `data`
  // with `...data` we unpack array and then push it in to the `cities` array
  .then(data => console.log(data) || cities.push(...data));

// the function below takes 2 arguments. First is `wordToMatch` = matching word. Second is array `cities` with all data
function findMatches(wordToMatch, cities) {
  // on array `cities` we are calling `filter` method
  // `place` is object that is "item" in the `cities` array
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    // The RegExp constructor creates a regular expression object for matching text with a pattern.
    // The constructor method is a special method for creating and initializing an object created within a class.
    // Flags for RegExp:
    // `g` => global match; find all matches rather than stopping after the first match
    // `i` => ignore case
    // The `new` operator creates an instance of a user-defined object type or of one of the built-in object types that has a constructor function.
    const regex = new RegExp(wordToMatch, "gi");
    // The Symbol.match well-known symbol specifies the matching of a regular expression against a string. This function is called by the `match()` method.
    // In the `return` below we are matching `city` or `state` base on regex
    return place.city.match(regex) || place.state.match(regex);
  });
}

// function `numberWithCommas` is copied from stackowerflow
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  // `this.value` is what user has typed, `cities` is an array of every city
  // result of `matchArray` is an array with object of cities
  const matchArray = findMatches(this.value, cities);
  // `place` is every object from array `cities` that passed by function `findMatches`
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      // The `replace()` method returns a new string with some or all matches of a `pattern` replaced by a `replacement`. The `pattern` can be a string or a `RegExp`, and the `replacement` can be a string or a function to be called for each match.
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
          <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
          </li>
        `;
    })
    // The `join()` method joins all elements of an array (or an `array-like object`) into a string and returns this string.
    .join("");
  // The `Element` property `innerHTML` gets or sets the HTML or XML markup contained within the element.
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
