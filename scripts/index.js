const searchBar = document.querySelector("#search");
const navBar = document.querySelector("#nav");

const accessKey =
  "pk.eyJ1IjoiZHlsYW5oYW1hZGEiLCJhIjoiY2p6ZzN4Nm4yMGZlMTNibG5rZHgxaWlweiJ9.sq7TBW2_ZeVF588ALeME-A";
mapboxgl.accessToken = accessKey;

let locationArr = [];
let markersArr = [];

/* Create a new map object, render it in the #map div, apply the 'light' 
style, and center it on the city of Toronto */
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  bounds: [
    -79.46677655444716,
    43.637986557103204,
    -79.36237086337621,
    43.68208586998085
  ]
});

searchBar.addEventListener("keyup", keyStrokes);

/* Callback function for the search bar's keydown event listener that
calls several other functions to update drop-down menu and update map */
function keyStrokes(event) {
  let searchVal = event.target.value;

  geoApiCall(searchVal);

  dropDownMenu(locationArr);

  createMarkers(locationArr);
}

/* Makes a GET request to Mapbox's Geocoding API, formatted with
the value in the search bar, and stores the response array in a global 
locationArr variable */
function geoApiCall(searchVal) {
  // Use regedit to format white space in search result
  const formattedSearch = searchVal.replace(/\s/g, `%20`);
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedSearch}.json?proximity=-79.38463116005312,43.652681912152616&bbox=-79.45205426676789,43.62528813725265,-79.31853054929633,43.697591723318226&access_token=${accessKey}`;

  if (formattedSearch) {
    let request = new XMLHttpRequest();

    request.open("GET", apiUrl, true);

    // Iterate through API response and store locations in array
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
  // If search term is empty string, reset location array
  else {
    locationArr = [];
  }

  return locationArr;
}

/* Creates a dynamic drop-down menu of locations based on the user's
search terms */
function dropDownMenu(locationArr) {
  let locationName = locationArr.map(location => location.text);
  let resultsDivs = document.querySelectorAll(".searchResults");

  // Remove all searchResult divs whenever function is called, ie "refresh"
  resultsDivs.forEach(div => {
    div.remove();
  });

  // If location array isn't empty, create new divs in nav bar for individual search results
  if (locationArr.length > 0) {
    locationName.forEach(name => {
      let newDiv = document.createElement("div");
      newDiv.className = "searchResults";
      newDiv.innerText = name;

      navBar.append(newDiv);
    });
  }
}

/* Updates the map object with dynamically-generated markers that
use elements in locationArr */
function createMarkers(locationArr) {
  // Remove all markers on the map each time the function is called
  if (markersArr.length > 0) {
    markersArr.forEach(marker => {
      marker.remove();
    });

    markersArr = [];
  }

  // Create a marker in the map object for each element in locationArr
  if (locationArr.length > 0) {
    locationArr.forEach(location => {
      let marker = new mapboxgl.Marker()
        .setLngLat(location.geometry.coordinates)
        .addTo(map);

      markersArr.push(marker);
    });
  }
}
