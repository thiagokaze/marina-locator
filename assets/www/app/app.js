var marina = {};

$(function() {

	function deviceReady() {
		var defaultPosition = {
			coords: {
				latitude: 47.688157,
				longitude: - 122.425461
			}
		};

		var success = function(position) {
			var coords = position.coords;
			var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
			marina.map = marina.googleMap({latlng: latlng});
		};

		var fail = function(e) {
      console.log(e);
      if (marina.util.isConnected()) {
			  success(defaultPosition);
      } else {
        $('#map_canvas').html('No connection!');
      }
		};

    var connected = function() {
      console.log('connected');
      try {
		    navigator.geolocation.getCurrentPosition(success, fail);
      } catch(err) {
        console.log(err);
        success(defaultPosition);
      }
    };

    var disconnected = function() {
      $('#map_canvas').html('No connection!');
    };

    if (marina.util.isConnected()) {
		  connected();
	    document.addEventListener("online", connected, false);
    } else {
      $('#map_canvas').html('No connection!');
	    document.addEventListener("offline", disconnected, false);
    }
	}

	document.addEventListener("deviceready", deviceReady, false);

});

