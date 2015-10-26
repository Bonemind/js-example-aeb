import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {ErrorNotificationInterceptor} from './error_notification_interceptor'
import {FlashMessages} from './flash_messages'

@inject(HttpClient, ErrorNotificationInterceptor, FlashMessages)
export class ApplicationState {

	//Inject the aurelia http-client, custom errornotificationinterceptor and flashmessages service
	constructor(http, errorNotificationInterceptor, flashMessages) {
		//Store a reference to the predefined client
		this.client = http;

		//Make the messages service available
		this.messages = flashMessages;

		//Set some basic configuration for the httpclient
		this.client.configure( x=> {
			//Define a baseurl, all methods will be relative to this url
			x.withBaseUrl('http://localhost:3000/');

			//Define a header that should always be sent, currently set to the development app token
			x.withHeader('App-Token', '00000000-0000-0000-0000-000000000000');

			//Add the interceptor that notifies us of error to the call chain
			//see ./error_notification_interceptor.js for implementation details
			x.withInterceptor(errorNotificationInterceptor);
		});
	}

	//Wrapper for get requests
	get(entity, id = '') {
		return this.client.get(`${entity}/${id}`).then( response => {
			var parsed = JSON.parse(response.response);
			parsed.statusCode = response.statusCode;
			parsed.raw = response;
			return parsed;
		});
	}

	//Wrapper for login functionality
	login(email, password) {
		//Post the credentials to /auth/login
		return this.client.post('auth/login', {email: email, password: password}).then(response => {
			//The promise resolved, parse the response, and configure httpclient to use the token
			//that the user got for this session
			var parsed = JSON.parse(response.response).data;
			this.client.configure( config => {
				config.withHeader('User-Token', parsed.uuid);
			});

			//Return the parsed body to the next 'then' in the chain
			return parsed;
		}).then(data => {
			//Return a promise that fetched the data of the user that was logged in
			return this.get('users', data.user_id);
		}).then(userdata => {
			//Store the data of the user
			this.user = userdata.data;
			return this.user;
		});
	}

	//Wrapper for logging out
	logout() {
		//We are not logged in, logout is a pointless action, return
		if (this.user === undefined || this.user === null) {
			return;
		}

		//Send a delete request to /auth/logout to destroy this token
		this.client.delete('auth/logout').then((resp) => {
			//The promise resolved, display feedback to the user
			this.messages.addMessage('You have been logged out', 'Logout');

			//We are not logged in anymore, set the current user to null
			this.user = null;

			//We don't have a valid token anymore, empty the User-Token header
			this.client.configure( config => {
				config.withHeader('User-Token', '');
			});
		});
	}
}
