const canvas = document.querySelector("#draw");
// `getContext()` method returns a drawing context on the canvas, or null if the context identifier is not supported.
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#bada55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = 'darken'

let isDrawing = false;
let direction = true;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e) {
  if (!isDrawing) return; // stop the fnc from running when there is not mouse down
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // The `.beginPath()` method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
  ctx.beginPath();
  // The `.moveTo()` method of the Canvas 2D API moves the starting point of a new sub-path to the (x, y) coordinates.
  ctx.moveTo(lastX, lastY);
  // The `.lineTo()` method of the Canvas 2D API connects the last point in the sub-path to the x, y coordinates with a straight line (but does not actually draw it).
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // --------------------
  // DESTRUCTURING ASSIGNMENT
  // The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

  // lastX = e.offsetX;
  // lastY = e.offsetY;

  [lastX, lastY] = [e.offsetX, e.offsetY];
  // --------------------

  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
