const panels = document.querySelectorAll(".panel");
var lastActive;
function toggleOpen() {
  this.classList.toggle("open");
  lastActive ? lastActive.classList.remove("open") : null;
  lastActive = document.querySelector(".open");
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
