import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {FlashMessages} from '../flash_messages';

@inject(ApplicationState, FlashMessages)
export class Cities {
	heading = 'City listing';

	//Setup this module with instances of appstate and flashmessages
	constructor(appState, flashMessages) {
		this.appState = appState;
		this.messages = flashMessages;
	}

	//Activate is called when the user navigates to the route
	activate() {
		this.update();
	}

	//Update is a function we defined ourselves
	update() {
		//Uses the preconfigured client in appstate to do a get request to 'cities' relative to the
		//preconfigured baseUrl. The total url would be http://localhost:3000/cities
		//The call returns a promise, and defines one action to execute when the promise resolves
		return this.appState.client.get('cities')
			.then(response => {
				//The promise resolved, parse the response, set this.cities to the list of cities
				//Then display a message to the user
				this.cities = JSON.parse(response.response).data;
				this.messages.addMessage('Cities successfully loaded', 'Loaded', 'success');
			})

	}

	delete(id){
		//Uses the preconfigured client in appstate to do a delete request to 'cities/10' relative to the
		//preconfigured baseUrl. The total url would be http://localhost:3000/cities/10
		//Of course 10 above is just an example
		//This also returns a promise
		return this.appState.client.delete(`cities/${id}`).then(response => {
			//The delete request resolved, display feedback to the user, the update the list of cities left
			this.messages.addMessage('City successfully deleted', 'Deleted', 'success');
			this.update();
		});
	}
}
