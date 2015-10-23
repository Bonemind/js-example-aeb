import {inject} from 'aurelia-framework'
import {ApplicationState} from './application_state'
import {FlashMessages} from './flash_messages'

@inject(ApplicationState, FlashMessages)
export class Login {
	constructor(applicationState, flashMessages) {
		this.appState = applicationState;
		this.email = 'aeb@development.com';
		this.password = 'aebdevelopment';
		this.messages = flashMessages;
	}
	login() {
		this.appState.login(this.email, this.password).then(user => {
			this.messages.addMessage(`Welcome back ${user.email}`, 'Logged in');
		});
	}
}
