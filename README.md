# ☢ THiNX-Connect

[![Coverage Status](https://coveralls.io/repos/github/suculent/thinx-connect/badge.svg?branch=master)](https://coveralls.io/github/suculent/thinx-connect?branch=master)

Simple thinx.cloud HTTP to HTTPS proxy server for your Raspberry Pi or another node.js capable machine.

## Installation

  Requires having `node.js` installed as a prerequisite.

```
git clone https://github.com/suculent/thinx-connect.git
cd thinx-connect/
npm install .
```

## Running

You can run the proxy-server simply with `node app.js`, but it's recommended to use some process-manager like `forever` (warning: installing forever on Raspberry Pi 3 may take more than 30 minutes):

      [sudo] npm install forever -g
      forever -o out.log -e err.log app.js

## Roadmap

* Should appear as thinx.cloud.local on local network so the devices looking for thinx.cloud will find proxy first
* Should provide optional MDNS responder 
* Should route MQTT as well
