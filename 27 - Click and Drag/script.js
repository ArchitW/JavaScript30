const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft; // initial value before scrolling

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return; // stop the fn from running
  e.preventDefault(); // preventing selecting text and so on
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // for every pixel moved we will move "* n" pixels
  slider.scrollLeft = scrollLeft - walk;
});
