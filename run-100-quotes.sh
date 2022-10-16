#!/bin/bash
echo y | firebase database:set / ./playwright-tests/utils/db/100-quotes.json --force
npx playwright test