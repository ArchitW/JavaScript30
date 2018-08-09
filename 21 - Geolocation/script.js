const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

// The Geolocation method `watchPosition()` method is used to register a handler function that will be called automatically each time the position of the device changes. You can also, optionally, specify an error handling callback function.
// The Geolocation.getCurrentPosition() method is used to get the current position of the device.
// The `Navigator` interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities.
// The Geolocation method watchPosition() method is used to register a handler function that will be called automatically each time the position of the device changes. You can also, optionally, specify an error handling callback function.
navigator.geolocation.watchPosition(
  data => {
    // `data` is object with `coords` and `timestamp`
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  err => {
    console.error(err);
    alert("HEY! You gotta allow that to happen!!!");
  }
);
