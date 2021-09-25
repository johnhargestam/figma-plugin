#!/bin/bash
set -e
rm -rf build dist node_modules
yarn install --frozen-lockfile --production
yarn build

rm -rf build dist node_modules
yarn install --frozen-lockfile
yarn build:dev
yarn test:coverage
yarn test:lint
yarn format
