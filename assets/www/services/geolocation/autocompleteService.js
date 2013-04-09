var input, results;
var timeout;
var colors = ['#0042CE', '#BF0404', '#F2BB16', '#0034AA', '#32A62E', '#BF0404'];

function initialize() {
	input = document.getElementById('input');
	results = document.getElementById('results');
	var service = new google.maps.places.AutocompleteService();
	
	google.maps.event.addDomListener(input, 'input', function() {
	var query = input.value;
	if (!query) {
		results.style.display = 'none';
		return;
	}
	window.clearTimeout(timeout);
	timeout = window.setTimeout(function() {
		service.getQueryPredictions({ input: query }, callback);
		}, 100);
	});
}

function callback(predictions, status) {
	if (status != google.maps.places.PlacesServiceStatus.OK) {
		results.style.display = 'none';
		return;
	}
	
	results.innerHTML = '';
	createResults(predictions);
	results.style.display = 'block';
}

// Rotates color highlighting based on input length.
function createResults(predictions) {
	for (var i = 0, prediction; prediction = predictions[i]; i++) {
		var colorIndex = (i + input.value.length - 1) % colors.length;
		results.appendChild(createResult(prediction, colors[colorIndex]));
	}
}

// Highlights a prediction with given color.
function createResult(prediction, color) {
	var text = prediction.description;
	var matches = prediction.matched_substrings;
	var result = document.createElement('li');
	var pos = 0;
	
	for (var i = 0, match; match = matches[i]; i++) {
		result.appendChild(createSubStrNode(text, pos, match.offset));
		pos = match.offset + match.length;
		result.appendChild(createSubStrNode(text, match.offset, pos, color));
	}
	result.appendChild(createSubStrNode(text, pos, text.length));
	result.addEventListener("click", function(event) {
		input.value = $(result).text();
		results.style.display = 'none';
		$("input").trigger("geocode");
	});
	return result;
}

// Returns a substring text node, color is optional.
function createSubStrNode(str, first, last, color) {
	var textNode = document.createTextNode(str.substring(first, last));
	if (!color) return textNode;
	
	var node = document.createElement('b');
	node.appendChild(textNode);
	node.style.color = color;
	return node;
}

google.maps.event.addDomListener(window, 'load', initialize);
