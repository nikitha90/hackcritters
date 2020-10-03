const processMessage = require("../services/messengerService");
const CONSTANTS = require("../CONSTANTS");
module.exports = (req, res) => {
  if (req.body.object === CONSTANTS.PAGE) {
    console.log("received message from facebook");
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.text) {
          console.log("text message received");
          processMessage(event);
        }
      });
    });
    res.status(200).end();
  }
};
