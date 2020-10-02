const apiAiClient = require("apiai")(API_AI_TOKEN);
const request = require("request");
const CONSTANTS = require("../CONSTANTS");

const FACEBOOK_ACCESS_TOKEN = CONSTANTS.VERIFICATION_TOKEN;
const API_AI_TOKEN = CONSTANTS.API_AI_TOKEN;

const sendTextMessage = (senderId, text) => {
  request({
    url: CONSTANTS.FB_URL,
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: CONSTANTS.POST,
    json: {
      recipient: { id: senderId },
      message: { text },
    },
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: CONSTANTS.CUSTOMER_SERVICE_AGENT,
  });
  apiaiSession.on(CONSTANTS.RESPONSE, (response) => {
    const result = response.result.fulfillment.speech;
    apiaiSession.on(CONSTANTS.RESPONSE, (response) => {
      const result = response.result.fulfillment.speech;
      sendTextMessage(senderId, result);
    });
    apiaiSession.on(CONSTANTS.ERROR, (error) => console.log(error));
    apiaiSession.end();
  });
};
