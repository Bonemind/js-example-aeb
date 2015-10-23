import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {FlashMessages} from '../flash_messages';

@inject(ApplicationState, FlashMessages)
export class Cities {
	heading = 'Github Users';
	users = [];

	constructor(appState, flashMessages) {
		this.appState = appState;
		this.appState.counter++;
		this.messages = flashMessages;
	}

	activate() {
		this.update();
	}

	update() {
		this.appState.counter++;
		console.log(this.appState.counter);
		return this.appState.client.get('cities')
			.then(response => {
				this.cities = JSON.parse(response.response).data;
				this.messages.addMessage('Cities successfully loaded', 'Loaded', 'success');
			})

	}

	delete(id){
		return this.appState.client.delete(`cities/${id}`).then(response => {
			this.messages.addMessage('City successfully deleted', 'Deleted', 'success');
			console.log(response);
			this.update();
		});
	}
}
