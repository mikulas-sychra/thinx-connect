var https = require('https');
var http = require('http');
var util = require('util');
var path = require('path');
var fs = require('fs');
var colors = require('colors');
var httpProxy = require('http-proxy');

var serverPort = null; // same as thinx.cloud API

var use_https = true; // disable for testing

if (use_https) {  
  /* production */
  serverPort = 7443;
  httpProxy.createProxyServer({
    target: 'https://thinx.cloud:7443',
    agent: https.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(7442);
} else {
  /* testing */
  serverPort = 7442;
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
if (use_https) {
  console.log("» HTTPS Proxy from port 7442 to port " + serverPort);
} else {
  console.log("» HTTP Proxy from port 7442 to port " + serverPort);
}

// Prevent crashes on uncaught exceptions

process.on("uncaughtException", function(err) {
  console.log("Caught exception: " + err);
});
