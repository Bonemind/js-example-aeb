import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class ApplicationState {
	constructor(http) {
		this.client = http;
		this.counter = 0;
		this.client.configure( x=> {
			x.withBaseUrl('http://localhost:3000/');
			x.withHeader('User-Token', '00000000-0000-0000-0000-000000000000');
			x.withHeader('App-Token', '00000000-0000-0000-0000-000000000000');
		});
	}
}
