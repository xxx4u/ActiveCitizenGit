var pictureSource,
	destinationType;

var openGallery = function (callback) {
	
	if (pictureSource === undefined){
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

	}
	
	navigator.gallery.getPicture(onGallerySuccess, onFail, {
		quality : 70,
		targetWidth : 100,
		targetHeight : 100
	});
	
	function onGallerySuccess(imageURI) {
		callback('file:///' + imageURI);
	}
	
	function onFail(message) {
		console.log('Failed because: ' + message);
	}
}

var openCamera = function (callback) {

	if (pictureSource === undefined){
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

	}

	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoURISuccess, onFail,
		{quality: 70, targetWidth: 100, targetHeight: 100}
	);

	function onPhotoURISuccess(imageURI) {
		createFileEntry(imageURI);

	}

	function createFileEntry(imageURI) {  
		window.resolveLocalFileSystemURI('file:///'+imageURI, movePhoto, acApp.fail);
	}


	function movePhoto(fileEntry) { // moves photo to the application dir with a proper name
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
			fileSys.root.getDirectory(acApp.appDirName, {create:true}, function(dir) {
				var name = new Date().getTime() + '.jpg';
				fileEntry.moveTo(dir, name, onCopySuccess, acApp.fail);
			}, acApp.fail); 
		}, acApp.fail);

	}

	function onCopySuccess(entry) {
		callback(entry.fullPath);
	}


	function onFail(message) {
		console.log('Failed because: ' + message);
	}

}

function deleteFile(filePath, callback) {
	
	window.resolveLocalFileSystemURI(filePath, function(fileEntry) {
		fileEntry.remove(function() {
			callback();
		}, acApp.fail);
	}, acApp.fail);
}

function deleteFiles(filePathsArray) {
	var i, len = filePathsArray.length;
	for (i=0; i < len; i++) {
		deleteFile(filePathsArray[i]);
	}	
}

