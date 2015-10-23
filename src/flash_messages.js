export class FlashMessages {
	constructor(timeout = 10000, defaultClass = 'success', messageElement = '#flash-message-holder') {
		this.timeout = timeout;
		this.defaultClass = defaultClass;
		console.log(messageElement);
		this.messageElement = messageElement;
	}

	addMessage(message, strong = '', messageType = this.defaultClass, timeout = this.timeout) {
		var d = $('<div/>', {
			class: `alert alert-${messageType}`,
		}).html(`<strong>${strong} </strong>${message}`);
		if (timeout > 0) {
			d.delay(this.timeout).fadeOut(400);
		}
		d.appendTo(this.messageElement);
		console.log(d);
	}
}
