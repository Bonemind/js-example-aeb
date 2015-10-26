import {inject} from 'aurelia-framework';
import {FlashMessages} from './flash_messages'
import {Router} from 'aurelia-router';

@inject(FlashMessages, Router)
export class ErrorNotificationInterceptor {
	//Inject the flashmessages and router instances
	constructor(flashMessages, router) {
		this.messages = flashMessages;
		this.router = router;
	}

	//Will get called when a request is made, you can modify the request here
	request(message) {
		console.log(message);
		return message;
	}

	//Will get called when a response is made, you can modify the response here
	//This method only fires on successfull responses, i.e. nothing in the 400 or 500 ranges
	response(response) {
		console.log(response);
		return response;
	}

	//Fires when we get an error from the server
	//You can return an HttpResponse object here to ignore the error
	responseError(response) {
		//Whatever we did was not found
		//Display feedback and redirect to index
		if (response.statusCode == 404) {
			this.messages.addMessage('That object does not exist', 'Not found', 'danger');
			this.router.navigate('/');
		}

		//We are not authorized and need to authorize for some action we just took
		//Redirect to the login route
		if (response.statusCode == 401) {
			this.messages.addMessage('You need to login first', 'Unathenticated', 'warning');
			this.router.navigate('/login');
		}
	}
}
