const searchBar = document.querySelector("#search");

function keyStrokes(event) {
  console.log(searchBar.value);
}

searchBar.addEventListener("keydown", keyStrokes);
