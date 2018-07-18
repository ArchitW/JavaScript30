const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog"
];

function strip(bandName) {
  // regex bellow mean:
  // `^` Matches the starting position within the string
  // (a | the | an) are words that we want to replace
  // `i` will ignore case sensitivity
  // `""` we want to replace word with "nothing"
  // The `trim()` method removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).
  return bandName.replace(/^(a |the |an )/i, "").trim();
}
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));

document.querySelector("#bands").innerHTML = sortedBands
  .map(band => `<li>${band}</li>`)
  .join("");
