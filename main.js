const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = 600;
cvs.height = 500;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let angle = 0;
let animationId;
let startAnimation = false;

let radius = 150;
let dividerRate = 0.1;
let distanceFromCentre = 100;
let depth = 2;

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
  circle(radius, distanceFromCentre, angle + Math.PI / depth);
}

// animation function
function drawCircle() {
  if (startAnimation) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    circle(radius, distanceFromCentre, 0);
    if (depth < 40) depth += dividerRate;
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
    angle = 0;
    depth = 0;
    startAnimation = false;
    drawCircle();
  }
}

// Set initial values for input fields
document.getElementById("circleRadius").value = radius;
document.getElementById("distanceFromCentre").value = distanceFromCentre;
document.getElementById("rate").value = dividerRate;
document.getElementById("depth").value = depth;

document.addEventListener("keydown", playPauseAnimation);
document
  .getElementById("playPauseButton")
  .addEventListener("click", playPauseAnimation);
document
  .getElementById("resetButton")
  .addEventListener("click", playPauseAnimation);

document
  .getElementById("circleRadius")
  .addEventListener("input", function (event) {
    radius = parseInt(event.target.value);
  });
document
  .getElementById("distanceFromCentre")
  .addEventListener("input", function (event) {
    if (distanceFromCentre !== parseInt(event.target.value)) {
      distanceFromCentre = parseInt(event.target.value);
    }
  });
document.getElementById("rate").addEventListener("input", function (event) {
  dividerRate = parseFloat(event.target.value);
});
document.getElementById("depth").addEventListener("input", function (event) {
  depth = parseFloat(event.target.value);
});
