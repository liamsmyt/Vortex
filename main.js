const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = 600;
cvs.height = 500;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let angle = 0;
let animationId;
let startAnimation = false;
let pos = "";

let depth = 2.0;

function getCoords(pos, angle, distanceFromCentre) {
  // center canvas
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  switch (pos) {
    case "topLeft":
      x -= 150;
      y -= 125;
      break;
    case "topRight":
      x += 150;
      y -= 125;
      break;
    case "bottomLeft":
      x -= 150;
      y += 125;
      break;
    case "bottomRight":
      x += 150;
      y += 125;
      break;
    default:
      console.log("Errpor: No valid pos given");
  }

  // return array
  return [x, y];
}

function circle(pos, radius, distanceFromCentre, angle) {
  // all circles have been drawn exit recursion
  if (angle > 2 * Math.PI) {
    return;
  }

  let coordinates = getCoords(pos, angle, distanceFromCentre); //returns [x, y] array

  let linearStrokeGradient = ctx.createLinearGradient(
    0,
    0,
    cvs.width,
    cvs.height
  );

  linearStrokeGradient.addColorStop(0, "red");
  linearStrokeGradient.addColorStop(1, "green");
  24;
  ctx.strokeStyle = linearStrokeGradient;
  ctx.beginPath();
  ctx.arc(coordinates[0], coordinates[1], radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  radius += 5;

  circle(pos, radius, distanceFromCentre, angle + Math.PI / depth);
}

// function growingCircle(radius, distanceFromCentre, angle, radiusIncrement) {
//   let coordinates = getCoords(angle, distanceFromCentre);
//   let yIncrease = 40;
//   let xIncrease = 5;
//   radius += radiusIncrement / 20;

//   for (let i = 0; i < 3; i++) {
//     yIncrease = yIncrease * i;
//     ctx.beginPath();
//     ctx.arc(coordinates[0], coordinates[1] + yIncrease, radius, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.closePath();
//   }

//   for (let i = 0; i < 3; i++) {
//     xIncrease = xIncrease * i * 2;
//     ctx.beginPath();
//     ctx.arc(coordinates[0] + yIncrease, coordinates[1], radius, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.closePath();
//   }

//   if (angle > 2 * Math.PI) {
//     return;
//   }

//   growingCircle(
//     radius,
//     distanceFromCentre,
//     angle + Math.PI / depth,
//     radiusIncrement
//   );
// }

// animation function
function drawCircle() {
  if (startAnimation) {
    // clear canvas for next frame
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    pos = "topRight";
    circle(pos, radius, distanceFromCentre, angle);
    pos = "topLeft";
    circle(pos, radius, distanceFromCentre, angle);
    pos = "bottomRight";
    circle(pos, radius, distanceFromCentre, angle);
    pos = "bottomLeft";
    circle(pos, radius, distanceFromCentre, angle);

    if (depth < instances) {
      depth += dividerRate;
    }

    animationId = requestAnimationFrame(drawCircle);
  }
}

// button input
function playPauseAnimation() {
  // Check if the pressed key is spacebar
  startAnimation = !startAnimation;
  drawCircle();
}
function resetAnimation() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  angle = 0;
  depth = 0;
  startAnimation = false;
}

// Set initial values for input fields
let radius = parseInt(document.getElementById("circleRadius").value);
let distanceFromCentre = parseInt(
  document.getElementById("distanceFromCentre").value
);
let dividerRate = parseFloat(document.getElementById("rate").value);
let instances = parseInt(document.getElementById("instances").value);

// button listeners
document
  .getElementById("playPauseButton")
  .addEventListener("click", playPauseAnimation);
document
  .getElementById("resetButton")
  .addEventListener("click", resetAnimation);

// input values
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
document
  .getElementById("instances")
  .addEventListener("input", function (event) {
    instances = parseFloat(event.target.value);
  });
