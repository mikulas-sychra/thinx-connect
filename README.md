# ☢ THiNX-Connect

[![Coverage Status](https://coveralls.io/repos/github/suculent/thinx-connect/badge.svg?branch=master)](https://coveralls.io/github/suculent/thinx-connect?branch=master)

Simple thinx.cloud HTTP to HTTPS proxy server for your Raspberry Pi or another node.js capable machine.

Based on [THiNX OpenSource IoT management platform](https://thinx.cloud).

## Installation

### Standalone node.js app

Requires having `node.js` installed as a prerequisite.

```
git clone https://github.com/suculent/thinx-connect.git
cd ./thinx-connect/
npm install .
```

### Docker image

There is also Docker image available [here](https://hub.docker.com/r/suculent/thinx-connect/) for installation via `docker pull suculent/thinx-connect`

## Running

If you have local DNS server, make sure the IP you're running this proxy at is referenced with a `thinx.local` name. Each THiNX device firmware should check this DNS name first before accessing the thinx.cloud backend directly.

You can run the proxy-server simply with `node app.js`, but it's recommended to use some process-manager like `forever` (warning: installing forever on Raspberry Pi 3 may take more than 30 minutes):

      [sudo] npm install forever -g
      forever -o out.log -e err.log app.js

## Running with Docker

THiNX-Connect is also available as a Docker image. The repository provides a `Dockerfile` to build the [THiNX-Connect](https://hub.docker.com/r/suculent/thinx-connect/) HTTP/HTTPS proxy.

***Warning***: The binary works on Ubuntu 14.04 and the build is based on Ubuntu 14.04 Trusty.

Build the docker image from this repository

```bash
  docker build -t thinx-connect .
```

Once the container is built successfuly create a container from the image

```bash
  docker create --name thinx-connect thinx-connect
```

Start the container and keep it running (in background)

```bash
   docker run -itd suculent/thinx-connect node /thinx-connect/app.js && bash
```

Start the container and keep it running (in foreground while inspecting the log)

```bash
  docker run -p 127.0.0.1:7442:7442 -p 127.0.0.1:7443:7443 -p 127.0.0.1:1883:1883 -p 127.0.0.1:8883:8883 -itd suculent/thinx-connect node /thinx-connect/app.js > nohup.out & tail -f nohup.out
```

```bash
  docker run -p7442:7442 -p7443:7443 -p1883:1883 -p8883:8883 -itd suculent/thinx-connect nohup forever /thinx-connect/app.js && tail -f nohup.out
```
