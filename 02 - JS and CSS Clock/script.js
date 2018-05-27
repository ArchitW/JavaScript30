const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
  // `new Date()` ==> create instance that represents a single moment in time
  const now = new Date();
  const seconds = now.getSeconds();
  // `+ 90` in secondsDegrees is because we offset hand by 90deg
  const secondsDegrees = seconds / 60 * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minDegrees = mins / 60 * 360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`;

  const hours = now.getHours();
  const hourDegrees = hours / 12 * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
// here we set that function `setDate` will repeat every second
setInterval(setDate, 1000);
