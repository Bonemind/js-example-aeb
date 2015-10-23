import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';
import {FlashMessages} from '../flash_messages'

@inject(ApplicationState, Router, FlashMessages)
export class CitiesCreate {
	heading = 'New city';
	users = [];

	constructor(appState, router, flashMessages) {
		this.name = '';
		this.appState = appState;
		this.appState.counter++;
		this.router = router;
		this.messages = flashMessages;
	}

	submit() {
		return this.appState.client.post('cities', { name: this.name }).then(x => {
			this.router.navigate('/cities');
			this.messages.addMessage('City created', 'Created');
		});
	}
}
