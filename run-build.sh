#!/bin/bash

MOUNT_DIR=${BUILD_DIR:='/service'}

set -e

echo
echo 'run build. profile: '${PROFILE}
echo

rm -rf static

npm install
npm run build:${PROFILE}

rm static/*.js.map

rm -rf ${MOUNT_DIR}/artifacts
mkdir -p ${MOUNT_DIR}/artifacts/static

cp -R static/* ${MOUNT_DIR}/artifacts/static/

rm ${MOUNT_DIR}/artifacts/static/index.html
cp static/index.html ${MOUNT_DIR}/artifacts/index.html
