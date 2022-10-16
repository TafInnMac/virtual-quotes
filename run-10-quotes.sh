#!/bin/bash
echo y | firebase database:set / ./playwright-tests/utils/db/10-quotes.json --force
npx playwright test -g "addNewQuote|filterQuotes"