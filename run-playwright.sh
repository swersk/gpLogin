#!/bin/bash

# Define holidays
HOLIDAYS=("11-01" "12-06" "12-23" "12-24" "12-25" "12-26" "12-27" "12-28" "12-29" "12-30" "12-31" "01-01")

# Get today's date in MM-DD format
TODAY=$(date +%m-%d)

# Check if today is a holiday
if [[ " ${HOLIDAYS[@]} " =~ " ${TODAY} " ]]; then
  echo "Skipping execution on holiday: $TODAY."
  exit 0
fi

# Get action from argument
ACTION=$1

# Validate the action
if [[ -z "$ACTION" || ( "$ACTION" != "clock-in" && "$ACTION" != "clock-out" ) ]]; then
  echo "Invalid or missing action. Use 'clock-in' or 'clock-out'."
  exit 1
fi

# Run the Playwright script with the specified action
echo "Running Playwright script for action: $ACTION on $TODAY."
node automation.js "$ACTION"
