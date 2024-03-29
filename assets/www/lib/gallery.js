/*
	    Copyright 2012 Bruno Carreira - Lucas Farias - Rafael Luna - Vin�cius Fonseca. 

		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
   		limitations under the License.   			
*/

/**
 * This class provides access to the gallery.
 *
 * @constructor
 */
var Gallery = function() {
	this.successCallback = null;
	this.errorCallback = null;
	this.options = null;
};

/**
 * Function to set the parameters for using in gallery.
 * 
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
Gallery.prototype.getPicture = function(successCallback, errorCallback,
		options) {

	// successCallback required
	if (typeof successCallback !== "function") {
		console.log("Gallery Error: successCallback is not a function");
		return;
	}

	// errorCallback optional
	if (errorCallback && (typeof errorCallback !== "function")) {
		console.log("Gallery Error: errorCallback is not a function");
		return;
	}

	if (options === null || typeof options === "undefined") {
		options = {};
	}
	if (options.quality === null || typeof options.quality === "undefined") {
		options.quality = 80;
	}
	if (options.maxResolution === null
			|| typeof options.maxResolution === "undefined") {
		options.maxResolution = 0;
	}

	if (options.targetWidth === null
			|| typeof options.targetWidth === "undefined") {
		options.targetWidth = -1;
	} else if (typeof options.targetWidth === "string") {
		var width = new Number(options.targetWidth);
		if (isNaN(width) === false) {
			options.targetWidth = width.valueOf();
		}
	}
	if (options.targetHeight === null
			|| typeof options.targetHeight === "undefined") {
		options.targetHeight = -1;
	} else if (typeof options.targetHeight === "string") {
		var height = new Number(options.targetHeight);
		if (isNaN(height) === false) {
			options.targetHeight = height.valueOf();
		}
	}

	cordova.exec(successCallback, errorCallback, "Gallery", "getPicture", [options]);
};

cordova.addConstructor(function() {
	if (typeof navigator.gallery === "undefined") {
		navigator.gallery = new Gallery();
	}
});