const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = 600;
cvs.height = 500;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let angle = 0;
let animationId;
let startAnimation = false;

let radiusIncrement = 0;

let radius = 100;
let dividerRate = 0.1;
let distanceFromCentre = 100;
let depth = 2;

function getCoords(angle, distanceFromCentre) {
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  // return array
  return [x, y];
}

function circle(radius, distanceFromCentre, angle) {
  let coordinates = getCoords(angle, distanceFromCentre); //returns [x, y] array

  ctx.beginPath();
  ctx.arc(coordinates[0], coordinates[1], radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  if (angle > 2 * Math.PI) {
    return;
  }

  circle(radius, distanceFromCentre, angle + Math.PI / depth);
}

function growingCircle(radius, distanceFromCentre, angle, radiusIncrement) {
  let coordinates = getCoords(angle, distanceFromCentre);
  let yIncrease = 40;
  let xIncrease = 5;
  radius += radiusIncrement / 20;

  for (let i = 0; i < 3; i++) {
    yIncrease = yIncrease * i;
    ctx.beginPath();
    ctx.arc(coordinates[0], coordinates[1] + yIncrease, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  for (let i = 0; i < 3; i++) {
    xIncrease = xIncrease * i * 2;
    ctx.beginPath();
    ctx.arc(coordinates[0] + yIncrease, coordinates[1], radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  if (angle > 2 * Math.PI) {
    return;
  }

  growingCircle(
    radius,
    distanceFromCentre,
    angle + Math.PI / depth,
    radiusIncrement
  );
}

// animation function
function drawCircle() {
  if (startAnimation) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    radiusIncrement++;
    growingCircle(radius, distanceFromCentre, 0, radiusIncrement);
    growingCircle(radius + 50, distanceFromCentre, 0, radiusIncrement);
    growingCircle(radius + 100, distanceFromCentre, 0, radiusIncrement);

    if (depth < 40) {
      depth += dividerRate;
    } else {
      return;
    }
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
    radiusIncrement = 0;
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
