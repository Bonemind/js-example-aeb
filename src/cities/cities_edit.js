import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';

@inject(ApplicationState, Router)
export class CitiesEdit {
	heading = 'Edit city';
	users = [];

	constructor(appState, router) {
		this.router = router;
		this.name = '';
		this.appState = appState;
		this.appState.counter++;
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
			console.log(response);
		});
	}
}
