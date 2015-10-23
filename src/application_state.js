import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import restful from 'restful.js/dist/restful.standalone.js';
import {ErrorNotificationInterceptor} from './error_notification_interceptor'
import {FlashMessages} from './flash_messages'

@inject(HttpClient, restful, ErrorNotificationInterceptor, FlashMessages)
export class ApplicationState {
	constructor(http, restfuljs, errorNotificationInterceptor, flashMessages) {
		this.client = http;
		this.counter = 0;
		this.messages = flashMessages;
		this.client.configure( x=> {
			x.withBaseUrl('http://localhost:3000/');
			x.withHeader('App-Token', '00000000-0000-0000-0000-000000000000');
			x.withInterceptor(errorNotificationInterceptor);
		});
	}

	get(entity, id = '') {
		return this.client.get(`${entity}/${id}`).then( response => {
			var parsed = JSON.parse(response.response);
			parsed.statusCode = response.statusCode;
			parsed.raw = response;
			return parsed;
		});
	}

	login(email, password) {
		return this.client.post('auth/login', {email: email, password: password}).then(response => {
			var parsed = JSON.parse(response.response).data;
			console.log(parsed);
			this.client.configure( config => {
				config.withHeader('User-Token', parsed.uuid);
			});
			return parsed;
		}).then(data => {
			return this.get('users', data.user_id);
		}).then(userdata => {
			this.user = userdata.data;
			console.log(this.user);
			return this.user;
		});
	}

	logout() {
		if (this.user === undefined || this.user === null) {
			return;
		}
		this.client.delete('auth/logout').then((resp) => {
			this.messages.addMessage('You have been logged out', 'Logout');
			this.user = null;
			this.client.configure( config => {
				config.withHeader('User-Token', '');
			});
		});
	}
}
