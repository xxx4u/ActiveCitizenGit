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
		window.plugins.WaitingDialog.show("�������� ����������");
	},

	hideDialog : function() {
		// show dialog
		window.plugins.WaitingDialog.hide();
	},

	CATEGORIES : {
		BLABES : [
			{ id: '11' , name: '�������, ���� �������' },
			{ id: '12' , name: '������ ������������' },
			{ id: '13' , name: '��������� ������������ �����' },
			{ id: '14' , name: '����� ��� �������� �������' }
		],
		DIAFORA: [
		    { id: '21' , name: '����������� ������' },
		    { id: '22' , name: '����� ������' }
		]
	}
}	
			
		