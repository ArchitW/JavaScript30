function playSound(e) {
  // here we are looking for specific (only one) `audio` element with specific `data-key`
  // `audio[data-key=65]` ==> this is atribute selector
  // `${e.keyCode}` ==> this is ES6 template string
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  // here we are looking for specific (only one) `div` with specific `data-key`
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  // if there is no audio element for specific keyCode we are stopping function
  if (!audio) return;
  audio.play();
  // rewind to the start - this will fix when we want to press the key multiple times per short period of time
  audio.currentTime = 0;
  key.classList.add("playing");
}

// here we are looking for every div with class `key`
const keys = document.querySelectorAll(".key");

function removeTransition(e) {
  // skip it if it's not a `transform`
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

// here we are listening for `transitionend` on every div with class `key` and when transition will end it will call the `removeTransition` function
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

// we are listening on window event - `keydown`
// `function(e)` give us an `event`
window.addEventListener("keydown", playSound);
