var acApp = {
	
	appDirName : 'Android/data/com.activecitizen/blobstorage',
	
	fail: function (error) {
		alert("Error: "+error.code);
	},
	
	changePage : function (pageSelector) {
		$.mobile.changePage(pageSelector);
	},

	showDialog : function() {
		// show dialog
		window.plugins.WaitingDialog.show("Παρακαλώ περιμένετε");
	},

	hideDialog : function() {
		// show dialog
		window.plugins.WaitingDialog.hide();
	},

	CATEGORIES : {
		BLABES : [
			{ id: '11' , name: 'Κλάδεμα, κοπή δέντρου' },
			{ id: '12' , name: 'Βλάβες οδοστρώματος' },
			{ id: '13' , name: 'Συντήρηση κοινόχρηστων χώρων' },
			{ id: '14' , name: 'Βλάβη στο δημοτικό φωτισμό' }
		],
		DIAFORA: [
		    { id: '21' , name: 'Πολεοδομικά θέματα' },
		    { id: '22' , name: 'Λοιπά θέματα' }
		]
	}
}	
			
		