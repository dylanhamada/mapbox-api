# Mapbox API Solo Project

## Overview

This app was created for the [Chingu](http://chingu.io) Voyage Solo Project. This is a Tier 2 project that challenges the participant's JavaScript, HTML, and CSS skills.

Specifically, it asks the participant to connect to the [Mapbox](http://www.mapbox.com) API and utilize it to create a searchable map.

This project was coded using vanilla HTML, CSS, and JavaScript.

## Features

- A fully interactive graphical map using the Mapbox GL API to generate a `map` object
  - The map is centered on the city of Toronto
- A navigation bar that includes a search bar, which the user can use to search the city for locations or points of interest
  - Each key stroke in the search bar triggers an API call to the Mapbox Geocoding API, which returns an array of objects containing location data
  - The array of location objects is parsed and used to populate a drop-down menu that lists all the locations
  - The array of location objects also populates the graphical map with markers designating the locations
- Clicking a selection in the drop-down menu, or a marker on the map, toggles a Popup object that displays the location name and address
- A menu button at the top of the page toggles the display of the entire navigation bar on or off

## Running the Project

### Live Version:

[https://dylanhamada.github.io/mapbox-api/](https://dylanhamada.github.io/mapbox-api/)

### From the Repo:

1. Visit the [repository](https://github.com/dylanhamada/mapbox-api), click **Clone or Download**, and copying the supplied URL
2. Create a local copy of the repository in any directory on your computer by typing the following: `git clone https://github.com/dylanhamada/mapbox-api.git`
3. Open index.html in your web browser and start browsing!

## Dependencies

- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) (CDN)
- [Mapbox Geocoding](https://docs.mapbox.com/help/how-mapbox-works/geocoding/#use-the-mapbox-geocoding-api) (CDN)
- [Font Awesome](https://fontawesome.com) (CDN)
- [Google Fonts](https://fonts.google.com/) (CDN)
