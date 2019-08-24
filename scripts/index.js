const searchBar = document.querySelector("#search");
let locationArr = [];

function keyStrokes(event) {
  let searchVal = event.target.value;

  apiCall(searchVal);

  console.log(locationArr);
}

function apiCall(searchVal) {
  const accessKey =
    "pk.eyJ1IjoiZHlsYW5oYW1hZGEiLCJhIjoiY2p6ZzN4Nm4yMGZlMTNibG5rZHgxaWlweiJ9.sq7TBW2_ZeVF588ALeME-A";
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchVal}.json?access_token=${accessKey}`;

  if (searchVal) {
    let request = new XMLHttpRequest();

    request.open("GET", apiUrl, true);

    request.onload = function() {
      let locationData = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        locationArr = locationData.features.map(location => location);
      } else {
        console.log("error");
      }
    };

    request.send();
  }

  return locationArr;
}

searchBar.addEventListener("keydown", keyStrokes);
