#!/bin/bash

# Get today's date in MM-DD format
TODAY=$(date +%m-%d)

# Check if today is in the exclusion period (Nov 1, Dec 6, Dec 25 to Jan 1)
if [[ "$TODAY" == "11-01" || "$TODAY" == "12-06" || \
      "$TODAY" == "12-25" || "$TODAY" == "12-26" || "$TODAY" == "12-27" || \
      "$TODAY" == "12-28" || "$TODAY" == "12-29" || "$TODAY" == "12-30" || \
      "$TODAY" == "12-31" || "$TODAY" == "01-01" ]]; then
  echo "Skipping execution on $TODAY."
  exit 0
fi

cd /Users/lswersky/Desktop/cezanneLogin
/usr/local/bin/node automation.js