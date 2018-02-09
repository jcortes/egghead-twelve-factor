const express = require("express");
const nodalytics = require("nodalytics");

const app = express();

// UA-12345678-1
// UA-53645638-1
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

app.use(nodalytics(googleAnalyticsId));

console.log(`Using Google Analytics ID ${googleAnalyticsId}`);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);