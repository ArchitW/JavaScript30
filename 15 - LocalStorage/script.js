const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem("items")) || [];
// we are checking if there is something in `localStorage` if not we will start with empty array.
// The `JSON.parse()` method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.

function addItem(e) {
  e.preventDefault();
  // in this contex `this` is form `.add-items`
  const text = this.querySelector("[name=item]").value;
  const item = { text, done: false }; // this is shorthand of the code `text: text`
  // The `HTMLFormElement.reset()` method restores a form element's default values. This method does the same thing as clicking the form's reset button.
  // items.push(item);
  items = [...items, item];
  // The read-only `localStorage` property allows you to access a `Storage` object for the `Document`'s origin; the stored data is saved across browser sessions.
  // The `setItem()` method of the `Storage` interface, when passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
  // `item` is the key
  // The `JSON.stringify()` method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
  // we must use `JSON.stringify()` because browser will use `items.toString()` and result will be `[object Object]`
  updateListAndLocalStorage(items, itemsList);
  this.reset();
}

function updateListAndLocalStorage(items, itemsList) {
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

function populateList(plates = [], platesList) {
  if (!platesList) {
    throw "platesList is not defined";
  }
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
      <label for="item${i}">${plate.text}</label>
    </li>`;
    })
    .join(""); // we are using `.join` because we have now an array created by `.map()`
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  updateListAndLocalStorage(items, itemsList);
}

addItems.addEventListener("submit", addItem);
// `itemsList` is `ul`
// This is event delegation. We are adding `addEventListener` to the parent element, and then we are making condtition
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);

const checkButton = document.querySelector("[data-check");
const uncheckButton = document.querySelector("[data-uncheck");
const clearButton = document.querySelector("[data-clear");

function checkAll(e) {
  e.preventDefault();
  items.forEach(item => {
    if (item.done === false) {
      item.done = true;
      updateListAndLocalStorage(items, itemsList);
    }
  });
}
function uncheckAll(e) {
  e.preventDefault();
  items.forEach(item => {
    if (item.done === true) {
      item.done = false;
      updateListAndLocalStorage(items, itemsList);
    }
  });
}
function clearAll(e) {
  e.preventDefault();
  localStorage.removeItem("items");
  itemsList.innerHTML = "";
}

checkButton.addEventListener("click", checkAll);
uncheckButton.addEventListener("click", uncheckAll);
clearButton.addEventListener("click", clearAll);
