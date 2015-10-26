import {inject} from 'aurelia-framework'
import {ApplicationState} from './application_state'
import {FlashMessages} from './flash_messages'

@inject(ApplicationState, FlashMessages)
export class Login {
	//Setup this class with instances of applicationstate and flashmessages
	constructor(applicationState, flashMessages) {
		//Prefill the development credentials, done to make logging in easier in development
		this.email = 'aeb@development.com';
		this.password = 'aebdevelopment';

		//Assignments to make everything available in this class
		this.messages = flashMessages;
		this.appState = applicationState;
	}

	//This gets called when the user submits credentials, see login.html for the wiring
	login() {
		//Call login in appstate which is essentially a wrapper for a post
		//When login is successfull, the client in appstate gets configured to use the correct token
		this.appState.login(this.email, this.password).then(user => {
			//The promise resolved successfully, display feedback to the user
			this.messages.addMessage(`Welcome back ${user.email}`, 'Logged in');
		});
	}
}
