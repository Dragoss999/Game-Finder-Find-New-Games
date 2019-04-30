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
	$('#startLocationButton').on('click', updatePosition);
	$('#stopLocationButton').on('click', stopPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
    var mymap = L.map('map-canvas').setView([52.195977, -2.225442], 17);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZ29zczk5OSIsImEiOiJjanNlb3gyMGowamEwM3ltZGtxd2V2M2RzIn0.R5eW9UF0UJFHiDWdguG74A'
    }).addTo(mymap);
});

/*axios({
  url: "https://api-v3.igdb.com/release_dates",
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'user-key': "670ff0704d2378cfa68684d9fe20882f",
  },
  data: "fields category,created_at,date,game,human,m,platform,region,updated_at,y;"
})
  .then(response => {
      console.log(response.data);
  })
  .catch(err => {
      console.error(err);
  });*/



//Call this function when you want to watch for chnages in position
function updatePosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}

//Call this function when you want to watch for chnages in position
function stopPosition() {
	
	//change time box to show updated message
	$('#time').val("Press the button to get location data");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.clearWatch(watchID);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
    var time = position.timestamp;
    var unixtime = new Date(position.timestamp);
    var date = unixtime.toDateString();
    var today = new Date();
	var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	$('#time').val("Recieved data at " + today);
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}