const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // The `Navigator` interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities. (We can access battery, geolocation, language, permissions, platform, plugins, storage, userAgent)
  // The `MediaDevices` interface provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.
  // The `MediaDevices getUserMedia()` method prompts the user for permission to use a media input which produces a `MediaStream` with tracks containing the requested types of media. That stream can include, for example, a video track (produced by either a hardware or virtual video source such as a camera, video recording device, screen sharing service, and so forth), an audio track (similarly, produced by a physical or virtual audio source like a microphone, A/D converter, or the like), and possibly other track types.
  // It returns a `Promise` that resolves to a `MediaStream` object. If the user denies permission, or matching media is not available, then the promise is rejected with `PermissionDeniedError` or `NotFoundError` respectively.
  // `CanvasCaptureMediaStreamTrack` canvas read-only property returns the HTMLCanvasElement from which frames are being captured.
  // The `try...catch` statement marks a block of statements to try, and specifies a response, should an exception be thrown.
  // The `URL.createObjectURL()` static method creates a `DOMString` containing a URL representing the object given in the parameter. The URL lifetime is tied to the `document` in the window on which it was created. The new object URL represents the specified `File` object or `Blob` object.
  // The `catch()` method returns a `Promise` and deals with rejected cases only. It behaves the same as calling `Promise.prototype.then(undefined, onRejected)` (in fact, calling `obj.catch(onRejected)` internally calls `obj.then(undefined, onRejected)`).
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(CanvasCaptureMediaStreamTrack => {
      try {
        video.srcObject = CanvasCaptureMediaStreamTrack;
      } catch (error) {
        video.src = URL.createObjectURL(CanvasCaptureMediaStreamTrack);
      }

      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  // The `drawImage()` method of the Canvas 2D API provides different ways to draw an image onto the canvas.
  // ctx.drawImage(image, dx, dy, dWidth, dHeight);
  // image => An element to draw into the context.The specification permits any canvas image source(`CanvasImageSource`), specifically, a `CSSImageValue`, an `HTMLImageElement`, an `SVGImageElement`, an `HTMLVideoElement`, an `HTMLCanvasElement`, an `ImageBitmap`, or an `OffscreenCanvas`.
  // dx => The X coordinate in the destination canvas at which to place the top - left corner of the source image.
  // dy => The Y coordinate in the destination canvas at which to place the top - left corner of the source image.
  // dWidth => The width to draw the image in the destination canvas.This allows scaling of the drawn image.If not specified, the image is not scaled in width when drawn.
  // dHeight => The height to draw the image in the destination canvas.This allows scaling of the drawn image.If not specified, the image is not scaled in height when drawn.
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // when we open last array in data object we get R,G,B,A values of every pixel

    pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);

    // ghosting effect
    // ctx.globalAlpha = 0.1;

    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // The `currentTime` property of the Web Animations API returns and sets the current time value of the animation in milliseconds, whether running or paused.
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firsChild);
}

// `redEffect` function makes red effect on picture
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // R
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // G
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // B
    // pixels.data[i + 3]; // A - but we do not need alpha channel
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
