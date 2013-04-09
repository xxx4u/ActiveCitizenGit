'use strict'

var ViewModelPerson = function (personSaved) {
	var self = this;

	self.data = {
		name: ko.observable(personSaved.name),
	    surname: ko.observable(personSaved.surname),
		address: ko.observable(personSaved.address),
		phone: ko.observable(personSaved.phone)
	};
	
	self.save = function() {
		localStorage.setItem('ActiveCitizen-Person', ko.toJSON( self.data ) );
		acApp.changePage('#page2');
	};
};	
