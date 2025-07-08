#!/bin/bash

echo "Testing CORS configuration..."

# Test health endpoint
echo "1. Testing health endpoint:"
curl -i -X GET http://localhost:3001/api/health \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"

echo -e "\n\n2. Testing quiz start endpoint:"
curl -i -X GET http://localhost:3001/api/quiz/start \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json"

echo -e "\n\n3. Testing OPTIONS preflight request:"
curl -i -X OPTIONS http://localhost:3001/api/quiz/start \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"

echo -e "\n\nCORS test completed!"
