import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';
import {FlashMessages} from '../flash_messages'

@inject(ApplicationState, Router, FlashMessages)
export class CitiesCreate {
	heading = 'New city';

	// Setup this class with instances of router, appstate, and flashmessages
	constructor(appState, router, flashMessages) {
		//Set the initial name of the city to empty
		this.name = '';

		//Assignments to make everything available in this class
		this.appState = appState;
		this.router = router;
		this.messages = flashMessages;
	}

	//This method gets called when the user submits a form, see cities_create.html for the wiring
	submit() {
		//Post to /cities with the body set to { name: this.name }
		return this.appState.client.post('cities', { name: this.name }).then(x => {
			//The promise resolved, redirect to the city listing route, and display feedback to the user
			this.router.navigate('/cities');
			this.messages.addMessage('City created', 'Created');
		});
	}
}
