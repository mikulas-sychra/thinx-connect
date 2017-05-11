var https = require('https'),
  http = require('http'),
  util = require('util'),
  path = require('path'),
  fs = require('fs'),
  colors = require('colors'),
  httpProxy = require('http-proxy');

var serverPort = 7442; // same as thinx.cloud API

var use_https = false;

if (use_https) {
  /* production */
  httpProxy.createProxyServer({
    target: 'https://thinx.cloud:7442',
    agent: https.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(7442);
} else {
  /* testing */
  httpProxy.createProxyServer({
    target: 'http://thinx.cloud:7442',
    agent: http.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(7442);
}

var package_info = require("./package.json");
var name = package_info.name;

var exec = require("sync-exec");
CMD = "git rev-list HEAD --count";
var temp = exec(CMD).stdout.replace("\n", "");
var version = "" + parseInt(temp);

console.log("");
console.log("-=[".red + " ☢ " + name.white + " v".red.bold + version.red.bold +
  " rev. ".red + version.red +
  " ☢ " + " ]=-".red);
console.log("");
console.log("» Started on port " + serverPort);

// Prevent crashes on uncaught exceptions

process.on("uncaughtException", function(err) {
  console.log("Caught exception: " + err);
});
