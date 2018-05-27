function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function(...args) {
    // `this` is window object
    let context = this;
    // The `arguments` object is an Array-like object corresponding to the arguments passed to a function.
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    // The `clearTimeout()` method of the `WindowOrWorkerGlobalScope` mixin cancels a timeout previously established by calling `setTimeout()`.
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    // The static `.apply()` method calls a target function with arguments as specified.
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
