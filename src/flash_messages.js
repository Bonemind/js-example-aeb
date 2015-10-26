//This class provides flash message methods for bootstrap styled flash messages
export class FlashMessages {

	//Set some default values that can be overridden
	constructor(timeout = 10000, defaultClass = 'success', messageElement = '#flash-message-holder') {
		//Set the default timeout
		this.timeout = timeout;

		//Set the default class, i.e. bootstrap's success, danger, and warning classes
		this.defaultClass = defaultClass;

		//The element all flashmessages will be added to
		this.messageElement = messageElement;
	}

	//Add a flash message
	addMessage(message, strong = '', messageType = this.defaultClass, timeout = this.timeout) {
		//This function builds a jquery div, that then gets appended to the div we want to add
		//flashmessages to
		var d = $('<div/>', {
			class: `alert alert-${messageType}`,
		}).html(`<strong>${strong} </strong>${message}`);
		if (timeout > 0) {
			d.delay(this.timeout).fadeOut(400);
		}
		d.appendTo(this.messageElement);
	}
}
