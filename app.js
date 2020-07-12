const http = require('http');
const crypto = require('crypto');
const commandParser = require('./commandParser');
const commands = require('./commands');

const cmd = new commands();
const cmdParser = new commandParser(cmd.getHandlers());

const sharedSecret = process.env.shared_secret
if(!sharedSecret) {
	console.log('Failed to load shared_secret from environment');
}

const bufSecret = Buffer(sharedSecret, "base64");
var PORT = process.env.port || process.env.PORT || 8080;

http.createServer(function(request, response) {
	var payload = '';
	// Process the request
	request.on('data', function (data) {
		payload += data;
	});

	// Respond to the request
	request.on('end', function() {
		try {
			if(!isAuthorized(this.headers['authorization'], payload)) {
				response.writeHead(200);
				response.write('{ "type": "message", "text": "Error: message sender cannot be authenticated." }');
				return response.end();
			}

			var receivedMsg = JSON.parse(payload);
			var answer = cmdParser.handle(receivedMsg.text)
			var responseBody = JSON.stringify({'type': 'message', 'text': answer});

			response.writeHead(200);
			response.write(responseBody);
			response.end();
		}
		catch (err) {
			response.writeHead(400);
			return response.end("Error: " + err + "\n" + err.stack);
		}
	});

}).listen(PORT);

function isAuthorized(auth, payload) {
	var msgBuf = Buffer.from(payload, 'utf8');
	var msgHash = "HMAC " + crypto.createHmac('sha256', bufSecret).update(msgBuf).digest("base64");

	return msgHash === auth
}

console.log('Listening on port %s', PORT);
