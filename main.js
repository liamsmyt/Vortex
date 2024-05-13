const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addResult() {
  if (inputBox.value === "" || isNaN(inputBox.value)) {
    alert("Input a number");
  } else {
    let li = document.createElement("li");
    let intValue = parseInt(inputBox.value);
    intValue += intValue;
    li.innerHTML = intValue;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
}
