const helpText = `\
This is the Teams Interactive Multi-purpose Interface Bot (Timi-Bot).
Sample usage (assuming the bot is called timi):

\`\`\`@timi ask How are you today? Good / Very Good\`\`\`

Supported commands
* help: Print this help text
* ask: Ask a question that can be voted for
`;

const mock_answer = `\
How are you today?

\`\`\`
\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE\u25AE   75% Good
\u25AE\u25AE\u25AE\u25AE   25% Very Good
\`\`\`
`

const commands = function() {
	this.getHandlers = function() {
		return {
			'help': function(input) {
				return helpText;
			},
			'ask': function(input) {
				if(!input) {
					return `ask: Let timi ask a question. Sample usage:\n@timi ask How are you today? Good / Very Good`
				}
				return input;
			},
			'answers': function(input) {
				return mock_answer;
			}
		}
	}
}

module.exports = commands