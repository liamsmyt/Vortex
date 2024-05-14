const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
cvs.width = cvs.height = 800;
cvs.style.display = "block";
cvs.style.margin = "0 auto";
let divider = 0.1;
let animationId;

function circle(radius, distanceFromCentre, angle) {
  let x = cvs.width / 2 + distanceFromCentre * Math.sin(angle);
  let y = cvs.height / 2 + distanceFromCentre * Math.cos(angle);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  if (angle > 2 * Math.PI) return;
  circle(200, 200, angle + Math.PI / divider);
}

function main() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  circle(200, 0, 0);
  if (divider < 12) divider += 0.1;
  animationId = requestAnimationFrame(main);
}
function handleKeyDown(event) {
  if (event.keyCode === 13) {
    main();
  }
}

// Add event listener for keydown on the document
document.addEventListener("keydown", handleKeyDown);
