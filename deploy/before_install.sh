#!/bin/sh

# Kill the previous process running
kill $(lsof -t -i:3000)

# Clean up the files before new deployment
rm -rf /home/ubuntu/parcelport/*
