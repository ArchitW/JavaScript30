const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  // Check if user had the shift down && check that user is checking it
  // The `.shiftKey` read-only property indicates if the shift key was pressed (true) or not (false) when the event occurred.
  // The `this.checked` returns a boolean and the result depends on if the checkbox is checked or not
  if (e.shiftKey && this.checked) {
    checkboxes.forEach(checkbox => {
      // `checkbox` is every checkbox in `checkboxes`
      // when looping checkboxes `checkbox === this` is the first element from top that is checked
      // when looping `checkbox === lastChecked` is previous checkbox that user clicked
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  // here we bind input that was last checked
  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
