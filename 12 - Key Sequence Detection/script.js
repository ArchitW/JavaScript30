const pressed = [];
const secretCode = "wesbos";
window.addEventListener("keyup", e => {
  pressed.push(e.key);
  // from index, remove
  console.log(pressed.length - secretCode.length);
  // if the first number is negative `splice()` starts from the end of array
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (pressed.join("").includes(secretCode)) {
    console.log("whoooo");
    cornify_add();
  }
});
