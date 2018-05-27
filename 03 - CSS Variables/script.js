// we do not need convert this `node list` to `array`, we can use `forEach`, but `forEach` may doesn't work on older browsers
const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  // `dataset` is object that will contain all data atributes from specified element
  //  `|| ''`; ==> this mean "or nothing" because we do not have data atributes for every `.controls` `input`
  const suffix = this.dataset.sizing || "";
  // `this.name` ==> spacing, blur, base
  // `this.value` ==> current value of selected `this.name`
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

// we call `forEach` method on `inputs`
// we add `eventListener` `change`, for inputs, then we call function `handleUpdate`
inputs.forEach(input => input.addEventListener("change", handleUpdate));

// we add eventListener `mousemove`, for inputs, then we call function `handleUpdate`
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));
