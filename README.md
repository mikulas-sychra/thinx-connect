# ☢ THiNX-Connect

Simple thinx.cloud HTTP to HTTPS proxy server for your Raspberry Pi or another node.js capable machine.

## Installation

  Requires having `node.js` installed as a prerequisite.

```
git clone https://github.com/suculent/thinx-connect.git
cd thinx-connect/
npm install .
```

## Running

You can run the proxy-server simply with `node app.js`, but it's recommended to use some process-manager like `forever`:

  [sudo] npm install forever -g
  forever -o out.log -e err.log app.js

## Roadmap

* Should provide MDNS responder
* Should route MQTT as well
