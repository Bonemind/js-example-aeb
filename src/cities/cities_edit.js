import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';
import {FlashMessages} from '../flash_messages'

@inject(ApplicationState, Router, FlashMessages)
export class CitiesEdit {
	heading = 'Edit city';
	users = [];

	constructor(appState, router, flashMessages) {
		this.router = router;
		this.name = '';
		this.appState = appState;
		this.appState.counter++;
		this.messages = flashMessages;
	}

	activate(params) {
		this.id = params.cityid;
		this.appState.client.get(`cities/${this.id}`).then(response => {
			console.log(response);
			var json = response.response;
			var city = JSON.parse(json).data;
			this.name = city.name;
			console.log(this.name);
		});
	}

	submit() {
		return this.appState.client.put(`cities/${this.id}`, { name: this.name }).then(response => {
			this.router.navigate('/cities');
			this.messages.addMessage('City updated', 'Updated');
		});
	}
}
