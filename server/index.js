const path = require("path");
const express = require("express");
const app = express();
const helmet = require("helmet");

// Configuration
const config = require("./config");

// Secure actions
app.use(helmet());

// Routes
app.use(require("./routes/events"));
app.use(require("./routes/categories"));

// If we are in production mode, route all non API requests
// to the react app
if (process.env.NODE_ENV == "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  );
}

// Start listening
app.listen(config.port, () =>
  console.log(`Listening at ${config.url}:${config.port} ..`)
);
