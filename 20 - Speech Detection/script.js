// The `SpeechRecognition` interface of the Web Speech API is the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service.
// `webkitSpeechRecognition` is prefix for Chrome
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// The `SpeechRecognition()` constructor creates a new SpeechRecognition object instance.
const recognition = new SpeechRecognition();

// The interimResults property of the SpeechRecognition interface controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.)
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", e => {
  console.log(Array.from(e.results));
  // `e.results` are` SpeechRecognitionResult`
  // The `SpeechRecognitionResult` interface of the Web Speech API represents a single recognition match, which may contain multiple SpeechRecognitionAlternative objects.
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("")
    .toLowerCase();
  console.log(typeof transcript);
  if (transcript.includes("lighting beetle")) {
    transcript = transcript.replace("lighting beetle", "💖💖💖💖💖💖");
  }
  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
  console.log(transcript);
});

// We are listening when we stop speaking, and then we call `recognition.start again`.
recognition.addEventListener("end", recognition.start);

recognition.start();
