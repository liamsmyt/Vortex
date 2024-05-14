const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = cvs.height = 1200;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let divider = 0.1;
let radius = 200;
let animationId;
let startAnimation = false;
let distanceFromCentre = 200;

function circle(radius, distanceFromCentre, angle) {
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  if (angle > 2 * Math.PI) {
    return;
  }
  circle(200, 300, angle + Math.PI / divider / 2);
}

// animation function
function drawCircle() {
  if (startAnimation) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    circle(200, 0, 0);
    if (divider < 12) divider += 0.1;
    animationId = requestAnimationFrame(drawCircle);
  }
}

//
function playPauseAnimation(event) {
  if (
    event.keyCode === 32 ||
    (event.type === "click" && event.target.id === "playPauseButton")
  ) {
    // Check if the pressed key is spacebar
    startAnimation = !startAnimation;
    drawCircle();
  }

  // reset animation
  if (
    event.key === "q" ||
    (event.type === "click" && event.target.id === "resetButton")
  ) {
    // Check if the pressed key is spacebar
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    divider = 0;
    startAnimation = false;
    drawCircle();
  }
}

// Add play/pause event listeners
document.addEventListener("keydown", playPauseAnimation);
document
  .getElementById("playPauseButton")
  .addEventListener("click", playPauseAnimation);
document
  .getElementById("resetButton")
  .addEventListener("click", playPauseAnimation);

function main() {}
