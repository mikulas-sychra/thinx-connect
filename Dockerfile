FROM ubuntu:trusty
ARG VERSION=master
MAINTAINER suculent

#ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y git bash nano wget nodejs npm \
  && ln -s /usr/bin/nodejs /usr/local/bin/node

RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && useradd --no-create-home thinx

RUN su thinx \
  && git clone https://github.com/suculent/thinx-connect.git \
  && chown -R thinx:thinx /thinx-connect \
  && cd /thinx-connect \
  && npm install . \
  && npm install forever -g

USER thinx

CMD which node \
&& cd ./thinx-connect \
&& nohup forever --minUptime 1000 --spinSleepTime 5000 ./app.js & tail -f nohup.out
