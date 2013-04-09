'use strict'

var reports = ko.utils.parseJson( localStorage.getItem('ActiveCitizen-Reports') );

var Report = function(category, address, description, imagePaths) {
	/*
	this.category = ko.observable(category);
	this.address = ko.observable(address);
	this.description = ko.observable(description);
	this.imagePaths = ko.observableArray(imagePaths);
	*/
	this.category = category;
	this.address = address;
	this.description = description;
	this.imagePaths = imagePaths;
};


var ViewModelReports = function () {
	var self = this, 
		currentItem;
	
	self.editing = ko.observable(false);
	
	self.person = new ViewModelPerson( ko.utils.parseJson(localStorage.getItem('ActiveCitizen-Person')) || {} );
	
	// map array of passed in Reports to an observableArray of Report objects
	self.reports = ko.observableArray(ko.utils.arrayMap(reports, function(report) {
		return new Report(report.category, report.address, report.description, report.imagePaths);
	}));
	
	self.categories = acApp.CATEGORIES;
	
	
	self.currentCategory = ko.observable();
	self.currentAddress = ko.observable();
	self.currentDescription = ko.observable();
	self.currentLat = ko.observable();
	self.currentLng = ko.observable();
	self.currentImagePaths = ko.observableArray();
	
	self.chooseCategory = function(item) {
		self.currentCategory(item.name);
		acApp.changePage("#page2");
	}
	
	self.emailItem = function() {
		findEmail('Boston');
	};
	
	self.downloadMap = function() {
		if (navigator.platform === 'Win32') {downloadMapWin32(self.currentLat(), self.currentLng()); return};
		downloadMap(self.currentLat(), self.currentLng(), 
			function() {
				alert('done');
			}
		);
	};
	
	self.fireCamera = function() {
		if (navigator.platform === 'Win32') {var imageURI = 'images/gf.png'; self.currentImagePaths.push(imageURI);return;}
		//acApp.showDialog();
		openCamera(function(imageURI){
			self.currentImagePaths.push(imageURI);
			//acApp.hideDialog();
		});
	};
	
	self.fireGallery = function() {
		if (navigator.platform === 'Win32') {var imageURI = 'images/gf.png'; self.currentImagePaths.push(imageURI);return;}
		openGallery(function(imageURI){
			self.currentImagePaths.push(imageURI);
		});
	};
	
	
	self.deleteImage = function(item) {
		if (navigator.platform === 'Win32') {self.currentImagePaths.remove(item); return;}
		deleteFile(item, function(){
			self.currentImagePaths.remove(item);
		});
	};
	
	$("#input").geocomplete({
	  map: "#map_canvas",
	  //details: "form ",
	  markerOptions: {
		draggable: true
	  }
    })
    .bind("geocode:result", function(event, result){
		self.currentAddress(result.formatted_address);
		self.currentLat(result.geometry.location.ib);
		self.currentLng(result.geometry.location.jb);
		console.log(result);
    })
	.bind("geocode:dragged", function(event, result) {
		console.log(result.lat()+', '+result.lng());
		$("#input").geocomplete("geocode", {'latLng': new google.maps.LatLng(result.lat(), result.lng())});
	});	
	/*
	ko.computed(function(){
		var xy = new google.maps.LatLng(self.currentLat(), self.currentLng());
		$("#input").geocomplete("geocode", {'latLng': xy});
	});
	*/
	self.diagnose = function() {
		 diagnostic.isLocationEnabled(locationEnabledSuccessCallback, locationEnabledErrorCallback);

		   function locationEnabledSuccessCallback(result) {
		      if (result)
		         alert("Location ON");
		      else
		         alert("Location OFF");
		   }

		   function locationEnabledErrorCallback(error) {
		      console.log(error);
		   }
		
	};
	
	
	self.fireGPS = function() {
		//var xy = new google.maps.LatLng(37.976985, 23.761752);
		//that.geocoder.geocode({'latLng': xy}, $.proxy(that.handleGeocode, that));
		getAccurateCurrentPosition(
			function(position) {
				//console.log(position.coords.latitude+', '+position.coords.longitude);
				if (position) {
					self.currentLat(position.coords.latitude);
					self.currentLng(position.coords.longitude);
				}
			}, 
			function(error) {
				if ($.mobile.activePage.data('url') === 'page3')
					alert('Cannot find address via GPS');
			},
			//geoprogress
			function(position){
				//show loader
			},
			//pageHide
			function(watchID){
				$('#page3').live('pagebeforehide', function() {
				    navigator.geolocation.clearWatch(watchID);
				});
			},
			//{maximumAge: 10000, timeout:60000, enableHighAccuracy: true}
			{desiredAccuracy:20, maxWait:15000}
		);
	};
   
		
	self.add = function() {
		
		var category = self.currentCategory();
		var address = self.currentAddress();
		var description = self.currentDescription() || '';
		var imagePaths = self.currentImagePaths();
		if (address) {
			self.reports.unshift(new Report(category, address.trim(), description.trim(), imagePaths));
		}
		acApp.changePage("#page1");
	};
	
	self.newItem = function() {
		self.editing(false);
		self.currentCategory('');
		self.currentAddress('');
		self.currentDescription('');
		self.currentImagePaths([]);
		acApp.changePage("#page2");
	}
	
	self.editItem = function(item, event) {
		self.editing(true);
		currentItem = item;
		//console.log(item);
		
		/*
		self.currentCategory(item.category());
		self.currentAddress(item.address());
		self.currentDescription(item.description());
		self.currentImagePaths(item.imagePaths());
		*/
		self.currentCategory(item.category);
		self.currentAddress(item.address);
		self.currentDescription(item.description);
		self.currentImagePaths(item.imagePaths);
		
		acApp.changePage("#page2");
	};
	
	self.replaceItem = function() {
		//console.log(currentItem.address());
		var category = self.currentCategory();
		var address = self.currentAddress();
		var description = self.currentDescription() || '';
		var imagePaths = self.currentImagePaths();
		if (address) {
			self.reports.replace(currentItem, new Report(category, address.trim(), description.trim(), imagePaths));
		}
		acApp.changePage("#page1");
	};
	
	self.removeItem = function( item ) {
		if (navigator.platform === 'Win32') {self.reports.remove( item ); return;}
		if (item.imagePaths.length > 0) {
			deleteFiles(item.imagePaths);
		}
		self.reports.remove( item );
		//$('#footer').show();
	};
	
	ko.computed(function() {
		// store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
		localStorage.setItem('ActiveCitizen-Reports', ko.toJSON( self.reports ) );
	}).extend({
		throttle: 500
	}); // save at most twice per second

};