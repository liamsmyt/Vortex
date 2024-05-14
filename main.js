const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = cvs.height = 1200;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let divider = 0.1;
let radius = 200;
let animationId;

function circle(radius, distanceFromCentre, angle) {
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "white"); // Start color
  gradient.addColorStop(1, "blue"); // End color // End color

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = gradient;
  ctx.stroke();
  ctx.closePath();
  ctx.closePath();

  if (angle > 2 * Math.PI) {
    return;
  }
  circle(radius, 200, angle + Math.PI / divider / 2);
}

function main() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  circle(radius, 0, 0);
  if (divider < 12) divider += 0.1;
  if (radius >= 200) radius += 0.5;
  animationId = requestAnimationFrame(main);
}

// Add event listener for keydown on the document
document.addEventListener("keydown", main);
