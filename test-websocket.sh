#!/bin/bash

echo "Creating document..."

curl -X POST http://localhost:8080/api/documents \
-H "Content-Type: application/json" \
-d '{"title":"OT Test","content":"abc"}'

echo ""
echo "Now manually copy the document ID above."
echo ""

echo "Opening WebSocket clients..."

npx wscat -c ws://localhost:8080/ws
