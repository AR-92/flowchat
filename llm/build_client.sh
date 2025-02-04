#!/bin/bash

# Process and obfuscate JavaScript file
JS_FILE="kw.js"
OBF_FILE="kw.obfuscated.js"

[[ ! -f "$JS_FILE" ]] && touch "$JS_FILE"

# Properly set the output file path
uglifyjs "$JS_FILE" --compress --mangle -o temp.min.js
javascript-obfuscator temp.min.js --output "$OBF_FILE"
rm temp.min.js

echo "Obfuscated file generated: $OBF_FILE"
