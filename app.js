process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var ThinxProxy = function() {

  var https = require('https');
  var http = require('http');
  var colors = require('colors');
  var httpProxy = require('http-proxy');
  var mdns = require('mdns');

  var rootCas = require('ssl-root-cas').create();
  require('https').globalAgent.options.ca = rootCas;
  require('ssl-root-cas').inject();

  console.log("Starting MQTT listener on port 1883...");

  /* MQTT HTTPS <*/
  httpProxy.createProxyServer({
    target: 'https://thinx.cloud:1883',
    agent: http.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(1883);

  console.log("Starting MQTTS listener on port 8883...");

  /* MQTTHTTP */
  httpProxy.createProxyServer({
    target: 'http://thinx.cloud:8883',
    agent: https.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(8883);

  console.log("Starting HTTP->HTTPS listener on port 7442->7443...");

  /* HTTP to HTTPS proxy */
  httpProxy.createProxyServer({
    target: 'https://thinx.cloud:7443',
    agent: https.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(7442);

  console.log("Starting HTTPS listener o port 7443...");

  /* HTTPS to HTTPS fall-trough */
  httpProxy.createProxyServer({
    target: 'https://thinx.cloud:7443',
    agent: https.globalAgent,
    headers: {
      host: 'thinx.cloud'
    }
  }).listen(7443);

  var package_info = require("./package.json");
  var name = package_info.name;

  var exec = require("child_process");
  var CMD = "git rev-list HEAD --count";
  var temp = execSync(CMD).replace("\n", "");
  console.log("CMD result: " + temp);
  var version = "" + parseInt(temp);

  console.log("");
  console.log("-=[".red + " ☢ " + name.white + " v".red.bold + version.red.bold +
    " rev. ".red + version.red +
    " ☢ " + " ]=-".red);

  var http_to_https_service = new mdns.ServiceType('thinx', 'proxy');
  var ad = mdns.createAdvertisement(http_to_https_service, 7442);
  ad.start();
};

var proxy = new ThinxProxy();
