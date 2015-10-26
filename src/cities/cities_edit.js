import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';
import {FlashMessages} from '../flash_messages'

@inject(ApplicationState, Router, FlashMessages)
export class CitiesEdit {
	heading = 'Edit city';

	// Setup this class with instances of router, appstate, and flashmessages
	constructor(appState, router, flashMessages) {
		//Set the initial name of the city to empty
		this.name = '';

		//Assignments to make everything available in this class
		this.appState = appState;
		this.router = router;
		this.messages = flashMessages;
	}

	//Activate is called when the user requests the route
	activate(params) {
		//Fetch the if of the city from the url
		//cityid is shoved in params because we defined this route as /edit/:cityid
		this.id = params.cityid;

		//Do a get request to /cities/cityid to fetch the data of the city we want to edit
		this.appState.client.get(`cities/${this.id}`).then(response => {
			//The promise resolved, set the name of the city to the data we want to edit
			var json = response.response;
			var city = JSON.parse(json).data;
			this.name = city.name;
		});
	}

	//This method gets called when the user submits a form, see cities_create.html for the wiring
	submit() {
		//PUT to /cities/cityid with the body set to { name: this.name }
		return this.appState.client.put(`cities/${this.id}`, { name: this.name }).then(response => {
			//The promise resolved, redirect to the city listing route, and display feedback to the user
			this.router.navigate('/cities');
			this.messages.addMessage('City updated', 'Updated');
		});
	}
}
