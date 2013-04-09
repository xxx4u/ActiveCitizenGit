'use strict'


$(document).ready(function () {
//$(document).bind('pageinit', function() { 
	if (navigator.platform === 'Win32') deviceReady();
	else document.addEventListener("deviceready", deviceReady, true);
	
	function deviceReady() {
		
		$.mobile.defaultPageTransition = 'slide';
		$.mobile.transitionFallbacks='none';
		$.mobile.page.prototype.options.backBtnText = "Πίσω";
		
		//$.mobile.loading( 'show' );
		
		ko.applyBindings(new ViewModelReports());
		
		/*
		window.plugins.diagnostic.isLocationEnabled(locationEnabledSuccessCallback, locationEnabledErrorCallback);

	    function locationEnabledSuccessCallback(result) {
	      if (result)
	         alert("Location ON");
	      else{
	         alert("Location OFF");
	         //window.plugins.diagnostic.switchToLocationSettings();
	         
	         window.plugins.webintent.startActivity( {
	        	    action: 'android.settings.BLUETOOTH_SETTINGS'
	        	  },
	        	  function ( success ) {
	        	    console.log( success );
	        	  },
	        	  function ( error ) {
	        	    console.log( error );
	        	  }
	        );
	      }   
	    }

	    function locationEnabledErrorCallback(error) {
	      alert(error);
	    }
	    */
		var w = $(window).width(), 
			h = $(window).height(),
			map_canvas = $('#map_canvas'),
			setMapSize = function(w, h) {
				map_canvas.width(w + 'px');
				map_canvas.height(h + 'px');
			},
			paddingW = 5,
			headerH = 42,
			inputH  = 54,
			w_ = w - paddingW,
			h_ = h - headerH - inputH;
		
		setMapSize(w_, h_);
		/*
		window.onorientationchange = function () {
			setTimeout(function(){
				w = $(window).width(), 
				h = $(window).height(),
				setMapSize(w_, h_);
			}, 2000);
		};
		*/
	
	}
});