const all = require("./all");
const dev = require("./dev");
const prod = require("./prod");

const config = process.env.NODE_ENV === "production" ? prod : dev;

module.exports = { ...all, ...config };
