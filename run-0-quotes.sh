#!/bin/bash
echo y | firebase database:set / ./playwright-tests/utils/db/0-quotes.json --force
npx playwright test -g "noQuotes"