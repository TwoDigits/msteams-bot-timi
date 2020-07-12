//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
const crypto = require('crypto');

const sharedSecret = process.env.shared_secret
if(!sharedSecret) {
	console.log('Failed to load shared_secret from environment');
}

const bufSecret = Buffer(sharedSecret, "base64");
var http = require('http');
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
			var responseMsg = '{ "type": "message", "text": "You typed: ' + receivedMsg.text + '" }';

			response.writeHead(200);
			response.write(responseMsg);
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
