import {inject} from 'aurelia-framework';
import {FlashMessages} from './flash_messages'
import {Router} from 'aurelia-router';

@inject(FlashMessages, Router)
export class ErrorNotificationInterceptor {
	constructor(flashMessages, router) {
		this.messages = flashMessages;
		this.router = router;
	}

	request(message) {
		console.log(message);
		return message;
	}
	response(response) {
		console.log(response);
		return response;
	}

	responseError(response) {
		if (response.statusCode == 404) {
			this.messages.addMessage('That object does not exist', 'Not found', 'danger');
			this.router.navigate('/');
		}

		if (response.statusCode == 401) {
			this.messages.addMessage('You need to login first', 'Unathenticated', 'warning');
			this.router.navigate('/login');
		}
	}
}
