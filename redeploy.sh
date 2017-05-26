#!/bin/bash

#
# This script fetches current version of this GIT repository
# and starts the application using npm package `forever`
# in background. Then it monitors its logs and can be terminated at will.
#

# To prevent further errors, we should destroy your changes now (but we didn't):
# git reset --soft
# git reset --hard

# fetching current version may fail though:

git pull origin master # you may delete `origin master` to track own branch

# install forever globally if not found on path
HAS_FOREVER=$(which forever)
if [[ ! -f ${HAS_FOREVER} ]]; then
	echo "Installing 'forever' node.js process manager, this could take a while on Raspberry Pi (tested on v3) and therefore we expect you'll have a plenty of time to read this until the end."
	npm install forever -g
fi

# log to file and do not exit with this terminal session
echo "Finally running the thinx-https-proxy until end of the days..."

killall tail

forever stop app.js

nohup forever -o out.log -e err.log app.js &

echo "Check out the log (you can log out / Ctrl-C anytime while keeping the proxy up)"
tail -f *.log
