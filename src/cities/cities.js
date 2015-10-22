import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';

@inject(ApplicationState)
export class Cities {
	heading = 'Github Users';
	users = [];

	constructor(appState) {
		this.appState = appState;
		this.appState.counter++;
	}

	activate() {
		this.update();
	}

	update() {
		this.appState.counter++;
		console.log(this.appState.counter);
		return this.appState.client.get('cities')
			.then(response => this.cities = JSON.parse(response.response).data)
	}

	delete(id){
		return this.appState.client.delete(`cities/${id}`).then(response => {
			console.log(response);
			this.update();
		});
	}
}
