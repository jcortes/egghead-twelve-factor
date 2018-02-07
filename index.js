const { config } = require("dotenv");
const path = require("path");
const express = require("express");
const proxy = require("express-http-proxy");

config();
console.log(process.env.CONFIG_VAR);

const app = express();

const baseImgUrl = process.env.BASE_IMG_URL;
const dir = path.join(__dirname, "public/images");

const proxyOptions = {
  proxyReqPathResolver: req => {
    const newPath = `${baseImgUrl}${req.path}`;
    console.log(newPath)
    return newPath;
  }
};

const handler = baseImgUrl
  ? proxy(baseImgUrl, proxyOptions)
  : express.static(dir);

app.use("/images", handler);

app.listen(8080);
