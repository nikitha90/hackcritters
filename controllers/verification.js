const CONSTANTS = require("../CONSTANTS");
module.exports = (req, res) => {
  const hubChallenge = req.query[CONSTANTS.HC];
  const hubMode = req.query[CONSTANTS.HM];
  const verifyTokenMatches =
    req.query[CONSTANTS.HVERIFY_TOKEN] === process.env.VERIFICATION_TOKEN;
  if (hubMode && verifyTokenMatches) {
    res.status(200).send(hubChallenge);
  } else {
    res.status(403).end();
  }
};
