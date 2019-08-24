const searchBar = document.querySelector("#search");
const navBar = document.querySelector("#nav");
let locationArr = [];

/* Callback function for the search bar's keydown event listener that
calls several other functions to update drop-down menu and update map */
function keyStrokes(event) {
  let searchVal = event.target.value;

  geoApiCall(searchVal);

  dropDownMenu(locationArr);
}

/* Makes a GET request to Mapbox's Geocoding API, formatted with
the value in the search bar, and stores the response array in a global 
locationArr variable */
function geoApiCall(searchVal) {
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

/* Creates a dynamic drop-down menu of locations based on the user's
search terms */
function dropDownMenu(locationArr) {
  let locationName = locationArr.map(location => location.text);
  let resultsDivs = document.querySelectorAll(".searchResults");

  resultsDivs.forEach(div => {
    div.remove();
  });

  if (locationArr.length > 0) {
    locationName.forEach(name => {
      let newDiv = document.createElement("div");
      newDiv.className = "searchResults";
      newDiv.innerText = name;

      navBar.append(newDiv);
    });
  }
}

searchBar.addEventListener("keydown", keyStrokes);
