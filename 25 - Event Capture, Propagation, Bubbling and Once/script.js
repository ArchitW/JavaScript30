const divs = document.querySelectorAll('div');
function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); // stop bubbling
}

// capture => run the function on the way down, rather on the way up. Default is a `false`
// default log is `one, two, tree`, with `capture:true` is log `tree, two, one`
// with `once: true` will listener listen for the click, and then unbind itself that is the same as `div.removeEventListener('click', logText)
divs.forEach(div =>
  div.addEventListener('click', logText, { capture: true, once: true })
);
