#!/bin/bash
export PATH=$PATH:$(pwd)/node_modules/.bin
echo "PATH: $PATH"
echo "Looking for astro..."
which astro
ls -la node_modules/.bin/astro
./node_modules/.bin/astro build
