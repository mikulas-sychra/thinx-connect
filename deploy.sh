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
if [[ ! -f $(which forever) ]]; then
	npm install forever -g
fi

# log to file and do not exit with this terminal session
nohup forever -o out.log -e err.log app.js &

tail -f *.log
