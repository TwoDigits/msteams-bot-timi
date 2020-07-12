const helpText = `\
This is the Teams Interactive Multi-purpose Interface Bot (Timi-Bot).
Sample usage (assuming the bot is called timi):

\`\`\`@timi ask How are you today? Good / very good\`\`\`

Supported commands
* help: Print this help text
* ask: Ask a question that can be voted for
`;

const commands = function() {
	this.getHandlers = function() {
		return {
			'help': function(input) {
				return helpText;
			},
			'ask': function(input) {
				if(!input) {
					return `ask: Let timi ask a question. Sample usage:\n@timi ask How are you today? Good / very good`
				}
				return input;
			}
		}
	}
}

module.exports = commands