const timeNodes = Array.from(document.querySelectorAll("[data-time]"));
// The `split()` method splits a `String` object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.
// `node.dataset.time` is every `li` that is in `timeNodes` const. With dot notation we get `dataset` attribute, and then `time` value
// `The parseFloat()` function parses an argument and returns a floating point number.
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;

const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
