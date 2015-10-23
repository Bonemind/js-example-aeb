import {inject} from 'aurelia-framework';
import {FlashMessages} from './flash_messages'

@inject(FlashMessages)
export class ErrorNotificationInterceptor {
	constructor(flashMessages) {
		this.messages = flashMessages;
		console.log(this.messages)
	}

	request(message) {
		console.log(message);
		return message;
	}
	response(response) {
		this.messages.addMessage('That object does not exist', 'Not found', 'warning');
		return response;
	}
}
