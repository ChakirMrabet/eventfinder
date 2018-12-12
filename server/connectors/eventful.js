const axios = require("axios");

const { eventfulURL, eventfulAPIKey } = require("../config");

module.exports = axios.create({
  baseURL: eventfulURL,
  params: {
    app_key: eventfulAPIKey
  }
});
