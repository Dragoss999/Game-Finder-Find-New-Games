var watchID;

var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};


//when the jQuery Mobile page is initialised
$(document).on('pageinit', "#map-page", function() {
	
	//set up listener for button clicks
    console.log("I work")
	//Map code that worked until it didn't
    var mymap = L.map('map-canvas').setView([52.191580, -2.219281], 17);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZ29zczk5OSIsImEiOiJjanNlb3gyMGowamEwM3ltZGtxd2V2M2RzIn0.R5eW9UF0UJFHiDWdguG74A'
    }).addTo(mymap);
});