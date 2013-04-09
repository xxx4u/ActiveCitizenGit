function findEmail(political) {
	var url = "https://docs.google.com/spreadsheet/pub?key=0Ap_GQEAfYYNOdGx0U0hISGQ0UXlFREoxUjZqUk94RWc&single=true&gid=0&range=C2%3AD326&output=csv";
	$.get(url, function(data) { 
		var csv = data.split("\n"),
		len = csv.length, i, row = [];	
		for (i = 0; i < len; i++) {
			row = csv[i].split(",");
			if (row[0] === political) {
				console.log(row[1]);
				break;
			}
		}
		if (navigator.platform === 'Win32') return;
		sendEmail(row[1], 'subject', 'body', []);
	});
}

function sendEmail(to, subject, body, attachURI) { 
	var extras = {};
	extras[WebIntent.EXTRA_EMAIL] = to;
	extras[WebIntent.EXTRA_SUBJECT] = subject;
	extras[WebIntent.EXTRA_TEXT] = body;
	if ((attachURI !== undefined)&&(attachURI !== null)){
		if (attachURI.length !== 0){
			extras[WebIntent.EXTRA_STREAM] = attachURI;
		}
	}	  
	window.plugins.webintent.startActivity({ 
		action: WebIntent.ACTION_SEND_MULTIPLE,
		type: 'text/plain', 
		extras: extras 
	}, 
	function() {}, 
	function() {
		alert('Failed to send email via Android Intent');
	}
	); 
};