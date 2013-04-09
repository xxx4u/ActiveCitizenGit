function downloadMap(lat, lng, callback) {

	var uri = [], 
		h = -1,
		localFileName = 'map' + new Date().getTime() + '.jpg',
		ft = new FileTransfer();

	uri[++h] = 'http://maps.googleapis.com/maps/api/staticmap?center=';
	uri[++h] = lat;
	uri[++h] = ',';
	uri[++h] = lng;
	uri[++h] = '&zoom=15&markers=color:red|label|';
	uri[++h] = lat;
	uri[++h] = ',';
	uri[++h] = lng;
	uri[++h] = '&size=410x615&format=jpg-baseline&sensor=false&key=AIzaSyAS-BezLUMaVlLxcBSy1oRnBnqObQxD768';

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
		fileSys.root.getDirectory(acApp.appDirName, {create: true}, function (dir) {
				dir.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
					ft.download(encodeURI(uri.join('')), fileEntry.fullPath, function(entry) {
						callback();
					}, acApp.fail);
				}, acApp.fail);	  
		}, acApp.fail);
	}, acApp.fail);
}


function downloadMapWin32(lat, lng) {

	var uri = [], 
		h = -1;

	uri[++h] = 'http://maps.googleapis.com/maps/api/staticmap?center=';
	uri[++h] = lat;
	uri[++h] = ',';
	uri[++h] = lng;
	uri[++h] = '&zoom=15&markers=color:red|label|';
	uri[++h] = lat;
	uri[++h] = ',';
	uri[++h] = lng;
	uri[++h] = '&size=410x615&format=jpg-baseline&sensor=false&key=AIzaSyAS-BezLUMaVlLxcBSy1oRnBnqObQxD768';
	
	console.log(uri.join(''));

}
