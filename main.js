const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = 600;
cvs.height = 500;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let divider = 0.1;
let dividerRate = 0.1;
let radius = 200;
let angle = 0;
let animationId;
let startAnimation = false;
let distanceFromCentre = 50;

function circle(radius, distanceFromCentre, angle) {
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  if (angle > 2 * Math.PI) {
    angle = 0;
    return;
  }
  circle(radius, distanceFromCentre, angle + Math.PI / divider / 2);
}

// animation function
function drawCircle() {
  if (startAnimation) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    circle(radius, distanceFromCentre, angle);
    if (divider < 3) divider += dividerRate;
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
    if (radius !== parseInt(event.target.value)) {
      radius = parseInt(event.target.value);
    }
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
  console.log(divider);
  console.log(dividerRate);
});
