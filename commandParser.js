const commandParser = function(handlers) {
	this.handlers = handlers

	this.fallback = function() {
		console.log('Command not understood. Using fallback.');
		if(Object.keys(handlers).includes('help')) {
			return 'Sorry - I did not understand.\n\n' + handlers['help']('');
		}
		return 'Sorry - I did not understand.';
	}

	/**
	 * @param input the text entered by a user to communicate with the bot. E.g.
	 * "timi ask How are you today? Good / very good"
	 * the second word is interpreted as command (e.g. "ask").
	 * The remainder of the input is passed on the the handler corresponding to the command.
	 */
	this.handle = function(input) {
		console.log("Timi called");

		matches = /\s*([^\s]*)\s+([^\s]*)\s*(.*)/.exec(input);

		if(!matches){
			return this.fallback(input);
		}

		// There seems to be no clear way to detect the actual name of the bot.
		// It is just assumed, that message that mentiones the bot actually starts with the mention
		// This mention does not include the "@" as one might think.
		const botName = matches[1];
		const command = matches[2];
		const rest = matches[3];

		console.log(`botName=${botName}`);
		console.log(`command=${command}`);
		console.log(`rest=${rest}`);

		if(Object.keys(this.handlers).includes(command)) {
			return this.handlers[command](rest);
		} else {
			return this.fallback();
		}
	}
}

module.exports = commandParser