"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
router.get("/calculator", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.sendFile(__dirname + "/views/index.html");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.use(express.static("express"));
app.use("/css", express.static(__dirname + "express/css"));
app.set("views", "./views");
app.set("view engine", "ejs");

module.exports = app;
module.exports.handler = serverless(app);
