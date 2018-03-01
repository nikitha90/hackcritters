const API_AI_TOKEN = '992326f1c67f4df4b48b1c468b5c85cf';
const apiAiClient = require('apiai') (API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = process.env.VERIFICATION_TOKEN;
const request = require('request');


const sendTextMessage = (senderId, text) => {
 request({
		 url: 'https://graph.facebook.com/v2.6/me/messages',
		 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		 method: 'POST',
		 json: {
		 recipient: { id: senderId },
		 message: { text },
		 }
 		});
};

module.exports = (event) => {
		 const senderId = event.sender.id;
		 const message = event.message.text;
		const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'CustomerServiceAgent'});
		apiaiSession.on('response', (response) => {
		 const result = response.result.fulfillment.speech;

		 apiaiSession.on('response', (response) => {
		 const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, result);
		 });
		apiaiSession.on('error', error => console.log(error));
		 apiaiSession.end();
});
	}