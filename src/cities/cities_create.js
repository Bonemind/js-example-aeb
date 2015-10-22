import {inject} from 'aurelia-framework';
import {ApplicationState} from '../application_state';
import {Router} from 'aurelia-router';

@inject(ApplicationState, Router)
export class CitiesCreate {
	heading = 'New city';
	users = [];

	constructor(appState, router) {
		this.name = '';
		this.appState = appState;
		this.appState.counter++;
		this.router = router;
	}

	submit() {
		return this.appState.client.post('cities', { name: this.name }).then(x => {
			console.log(x);
			this.router.navigate('/cities');
		});
	}
}
